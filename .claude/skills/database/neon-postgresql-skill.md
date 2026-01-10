# Neon PostgreSQL Database Design Skill

## Overview
This skill provides expertise in designing and implementing PostgreSQL databases using Neon's serverless technology for the Todo application. The system leverages Neon's auto-scaling, branch, and pause/resume features while maintaining data integrity through proper schema design and SQLModel integration.

## Capabilities
- Design serverless PostgreSQL schemas optimized for Neon's architecture
- Implement proper user and task data models with relationships
- Configure foreign key constraints and referential integrity
- Design performance-optimized indexes for common queries
- Integrate database schema with SQLModel ORM
- Configure Neon-specific features like branching and auto-scaling
- Implement efficient data access patterns for Todo application

## Serverless PostgreSQL Concept
- **Auto-scaling**: Automatically scales compute resources based on demand
- **Always ready**: Database connections are instantly available without warm-up time
- **Pause/resume**: Automatically pauses compute when inactive, reducing costs
- **Branching**: Create isolated database branches for development and testing
- **Serverless compute**: Pay only for active compute time, not idle resources
- **Connection pooling**: Built-in connection pooling for efficient resource usage
- **Instant cloning**: Create database copies without data duplication

## Schema Design for Users and Tasks

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);
```

### Indexes
- Primary keys automatically indexed
- Email field in users table for authentication
- User_id in tasks table for ownership queries
- Status and due_date for task filtering
- Created_at for time-based queries

## Foreign Key Relationships
- **User-Task Relationship**: `tasks.user_id` references `users.id`
- **Cascade Delete**: Optional cascading of user deletion to tasks
- **Referential Integrity**: Prevents orphaned tasks without valid users
- **Constraint Naming**: Consistent naming for foreign key constraints
- **Index Optimization**: Foreign key columns are indexed for join performance
- **Null Handling**: Proper handling of nullable foreign key relationships

## Indexing for Performance
- **B-tree Indexes**: Default for equality and range queries
- **Unique Indexes**: On email field to enforce uniqueness
- **Composite Indexes**: Multi-column indexes for complex queries
- **Partial Indexes**: Conditional indexes for specific query patterns
- **GIN Indexes**: For full-text search capabilities
- **Performance Monitoring**: Query plan analysis and index usage tracking
- **Index Maintenance**: Regular monitoring of index bloat and usage

## SQLModel Integration
- **Model Definition**: Map SQLModel classes to database tables
- **Relationship Mapping**: Define foreign key relationships in models
- **Type Safety**: Leverage Python type hints for database columns
- **Migration Support**: Integrate with Alembic for schema migrations
- **Async Operations**: Support for async database operations
- **Validation**: Pydantic validation integrated with database constraints
- **Query Building**: SQLModel's query building capabilities with Neon

## Neon-Specific Optimizations
- **Connection Limits**: Optimize connection pool settings for Neon
- **Statement Timeout**: Configure appropriate query timeouts
- **Idle Timeouts**: Configure connection idle timeout settings
- **Branch Management**: Proper branch naming and cleanup strategies
- **Storage Efficiency**: Leverage Neon's storage architecture
- **Monitoring**: Neon dashboard integration for performance monitoring

## Data Integrity and Security
- **Row Level Security**: Implement RLS for multi-tenant data isolation
- **Encryption**: Use Neon's built-in encryption at rest and in transit
- **Audit Logging**: Track data access and modification patterns
- **Backup Strategies**: Leverage Neon's point-in-time recovery
- **Access Control**: Proper user permissions and role management

## Performance Best Practices
- **Query Optimization**: Write efficient queries with proper JOIN strategies
- **Connection Management**: Optimize connection pooling for serverless
- **Caching Strategy**: Implement application-level caching for frequent queries
- **Batch Operations**: Efficient bulk operations for data imports/exports
- **Partitioning**: Use table partitioning for large datasets when needed