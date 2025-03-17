```mermaid
erDiagram
    USER {
        string user_id PK
        string name
        string email
        string password
    }
    BUSINESS {
        string business_id PK
        string name
        string owner_id FK
        string address
    }
    USER ||--o{ BUSINESS : "owns"
