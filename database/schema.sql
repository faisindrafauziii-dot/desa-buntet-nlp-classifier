-- Desa Buntet NLP Classification System Database Schema

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Kategori Pelayanan
CREATE TABLE service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dataset untuk Training
CREATE TABLE classification_datasets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    version VARCHAR(50),
    status VARCHAR(50) DEFAULT 'draft', -- draft, ready, archived
    total_records INTEGER DEFAULT 0,
    total_categories INTEGER DEFAULT 0,
    created_by UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_file_path VARCHAR(500)
);

-- Data Training/Testing
CREATE TABLE dataset_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dataset_id UUID NOT NULL REFERENCES classification_datasets(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    label VARCHAR(255) NOT NULL,
    is_duplicate BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Training History & Model Versioning
CREATE TABLE model_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version_number INTEGER,
    dataset_id UUID NOT NULL REFERENCES classification_datasets(id),
    status VARCHAR(50) DEFAULT 'training', -- training, completed, error
    
    -- Dataset Split Info
    total_records INTEGER,
    training_records INTEGER,
    testing_records INTEGER,
    train_test_ratio VARCHAR(20), -- "70:30", "80:20", "90:10"
    random_seed INTEGER,
    
    -- Preprocessing Configuration
    preprocessing_config JSONB, -- case_folding, cleaning, tokenization, stopword_removal, stemming config
    
    -- TF-IDF Configuration
    tfidf_vocabulary_size INTEGER,
    tfidf_config JSONB, -- max_features, min_df, max_df, etc
    
    -- Model Configuration
    algorithm VARCHAR(100) DEFAULT 'Multinomial Naive Bayes',
    model_config JSONB, -- alpha (Laplace smoothing), etc
    
    -- Evaluation Metrics
    accuracy DECIMAL(5, 4),
    macro_precision DECIMAL(5, 4),
    macro_recall DECIMAL(5, 4),
    macro_f1_score DECIMAL(5, 4),
    weighted_f1_score DECIMAL(5, 4),
    
    -- Per-category metrics (stored as JSON for flexibility)
    per_category_metrics JSONB,
    
    -- Confusion Matrix
    confusion_matrix JSONB,
    
    -- Model Storage
    model_file_path VARCHAR(500),
    tfidf_file_path VARCHAR(500),
    vocabulary_file_path VARCHAR(500),
    is_active BOOLEAN DEFAULT false,
    
    training_started_at TIMESTAMP,
    training_completed_at TIMESTAMP,
    training_duration_seconds INTEGER,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Per-Category Detailed Metrics
CREATE TABLE model_category_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_version_id UUID NOT NULL REFERENCES model_versions(id) ON DELETE CASCADE,
    category_name VARCHAR(255) NOT NULL,
    precision DECIMAL(5, 4),
    recall DECIMAL(5, 4),
    f1_score DECIMAL(5, 4),
    support INTEGER, -- number of true instances for this class
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Preprocessing Results for Visualization
CREATE TABLE preprocessing_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dataset_record_id UUID NOT NULL REFERENCES dataset_records(id) ON DELETE CASCADE,
    model_version_id UUID REFERENCES model_versions(id) ON DELETE SET NULL,
    
    original_text TEXT,
    after_case_folding TEXT,
    after_cleaning TEXT,
    after_tokenization TEXT,
    after_stopword_removal TEXT,
    after_stemming TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TF-IDF Matrix Storage (for visualization)
CREATE TABLE tfidf_vectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_version_id UUID NOT NULL REFERENCES model_versions(id) ON DELETE CASCADE,
    dataset_record_id UUID NOT NULL REFERENCES dataset_records(id) ON DELETE CASCADE,
    term VARCHAR(255),
    tfidf_value DECIMAL(10, 6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pengajuan Masyarakat (from Stage 1)
CREATE TABLE community_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_number VARCHAR(50) UNIQUE NOT NULL,
    citizen_name VARCHAR(255) NOT NULL,
    citizen_email VARCHAR(255),
    citizen_phone VARCHAR(20),
    
    -- Request Details
    request_description TEXT NOT NULL,
    
    -- Automatic Classification
    predicted_category_id UUID REFERENCES service_categories(id),
    predicted_label VARCHAR(255),
    prediction_confidence DECIMAL(5, 4),
    prediction_probabilities JSONB, -- all categories with their probabilities
    
    -- Admin Verification
    verified_category_id UUID REFERENCES service_categories(id),
    verified_label VARCHAR(255),
    is_verified BOOLEAN DEFAULT false,
    verification_notes TEXT,
    prediction_matches_verification BOOLEAN,
    
    -- Model Info
    model_version_id UUID REFERENCES model_versions(id),
    
    status VARCHAR(50) DEFAULT 'pending', -- pending, in_process, completed, rejected
    priority VARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
    
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Preprocessing Steps for Request
CREATE TABLE request_preprocessing_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_request_id UUID NOT NULL REFERENCES community_requests(id) ON DELETE CASCADE,
    
    original_text TEXT,
    after_case_folding TEXT,
    after_cleaning TEXT,
    after_tokenization TEXT,
    after_stopword_removal TEXT,
    after_stemming TEXT,
    
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prediction History for Analysis
CREATE TABLE prediction_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_version_id UUID NOT NULL REFERENCES model_versions(id),
    community_request_id UUID REFERENCES community_requests(id) ON DELETE SET NULL,
    
    input_text TEXT,
    predicted_label VARCHAR(255),
    actual_label VARCHAR(255), -- for testing data
    prediction_confidence DECIMAL(5, 4),
    probabilities JSONB,
    
    is_correct BOOLEAN, -- true if predicted_label == actual_label
    
    predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin', -- admin, researcher, viewer
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- Audit Log
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES admin_users(id),
    action VARCHAR(100),
    entity_type VARCHAR(100),
    entity_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_dataset_records_dataset_id ON dataset_records(dataset_id);
CREATE INDEX idx_model_versions_dataset_id ON model_versions(dataset_id);
CREATE INDEX idx_model_versions_is_active ON model_versions(is_active);
CREATE INDEX idx_preprocessing_results_dataset_record ON preprocessing_results(dataset_record_id);
CREATE INDEX idx_preprocessing_results_model_version ON preprocessing_results(model_version_id);
CREATE INDEX idx_tfidf_vectors_model_version ON tfidf_vectors(model_version_id);
CREATE INDEX idx_tfidf_vectors_record ON tfidf_vectors(dataset_record_id);
CREATE INDEX idx_community_requests_predicted_category ON community_requests(predicted_category_id);
CREATE INDEX idx_community_requests_verified_category ON community_requests(verified_category_id);
CREATE INDEX idx_community_requests_model_version ON community_requests(model_version_id);
CREATE INDEX idx_community_requests_status ON community_requests(status);
CREATE INDEX idx_prediction_history_model_version ON prediction_history(model_version_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(admin_user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Insert default service categories
INSERT INTO service_categories (name, description) VALUES
('Surat Pemindahan Domisili', 'Untuk mengurus perpindahan domisili ke desa/lokasi lain'),
('Surat Keterangan Kelahiran', 'Surat keterangan untuk anak yang baru lahir'),
('Surat Kematian', 'Surat keterangan untuk pelaporan kematian warga'),
('Surat Menikah/Belum Menikah', 'Surat keterangan status pernikahan'),
('Surat Keterangan Beda Data', 'Untuk koreksi data yang berbeda atau tidak sesuai'),
('Surat Permohonan', 'Surat permohonan untuk berbagai keperluan lainnya')
ON CONFLICT (name) DO NOTHING;
