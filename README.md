# GuardianAI 
Protecting Young Minds Through Intelligent Content Analysis

Hackathon Demo Video: [link](https://www.youtube.com/shorts/b1N_IlpLjUU)

## Hackathon POC
```mermaid
graph TD
    A[Mac Client] -->|Screenshot every 5s| B[FastAPI Server]
    
    B --> C[Llama 3.2 90B Vision]
    C -->|Scene Description| D[Llama 3.1 8B]
    D -->|Risk Assessment| E[(Firebase DB)]
    E --> F[React Dashboard]
    
    style A fill:#d4e6f1 color:#000000
    style B fill:#d5f5e3 color:#000000
    style C fill:#fadbd8 color:#000000
    style D fill:#fadbd8 color:#000000
    style E fill:#fdebd0 color:#000000
    style F fill:#d6eaf8 color:#000000

```

## Project Impact

```mermaid
graph LR
    subgraph Short["Short-term Impact"]
        A1[Risk Detection] --> A2[Prevention] --> A3[Communication]
    end
    
    subgraph Mid["Mid-term Impact"]
        B1[School Safety] --> B2[Mental Health] --> B3[Digital Literacy]
    end
    
    subgraph Long["Long-term Impact"]
        C1[Research Impact] --> C2[Policy Change] --> C3[Global Reach]
    end
    
    Short --> Mid --> Long
    
    classDef default color:#000000
    classDef boxStyle fill:#666666,stroke:#333,stroke-width:2px,color:#ffffff
    classDef short fill:#d4e6f1,color:#000000
    classDef mid fill:#d5f5e3,color:#000000
    classDef long fill:#fadbd8,color:#000000
    
    class Short,Mid,Long boxStyle
    class A1,A2,A3 short
    class B1,B2,B3 mid
    class C1,C2,C3 long
```

## Performance Metrics

```mermaid
graph TD
    subgraph Tech["Technical Metrics"]
        A1[Precision] & A2[Recall] & A3[F1 Score] & A4[Latency] --> TS[Technical Score]
    end
    
    subgraph User["User Metrics"]
        B1[Parent Feedback] & B2[Adoption Rate] --> US[User Score]
    end
    
    subgraph Impact["Impact Metrics"]
        C1[Safety Incidents] & C2[Mental Health] --> IS[Impact Score]
    end
    
    TS & US & IS --> TOTAL[Total Effectiveness Score]
    
    classDef default color:#000000
    classDef sectionStyle fill:#666666,stroke:#333,stroke-width:2px,color:#ffffff
    classDef techStyle fill:#d4e6f1,color:#000000
    classDef userStyle fill:#d5f5e3,color:#000000
    classDef impactStyle fill:#fadbd8,color:#000000
    classDef scoreStyle fill:#fdebd0,color:#000000
    classDef totalStyle fill:#d6eaf8,color:#000000
    
    class Tech,User,Impact sectionStyle
    class A1,A2,A3,A4 techStyle
    class B1,B2,B3 userStyle
    class C1,C2,C3 impactStyle
    class TS,US,IS scoreStyle
    class TOTAL totalStyle
```

## Expanded System Architecture

```mermaid
flowchart TD
    subgraph CL["Client Layer"]
        MAC[MacOS Client] --- WIN[Windows Client]
        WIN --- MOB[Mobile Client]
    end
    
    subgraph ML["Model Layer"]
        direction TB
        API[Threat Assessment API]
        VM[Vision Model]
        TM[Text Model]
        BM[Behavioral Model]
        API --> VM & TM & BM
        VM & TM & BM --> RA[Risk Aggregator]
    end
    
    subgraph DL["Data Layer"]
        AUTH[Authentication] --- DB[(Database)]
        DB --- LOGS[Audit Logs]
    end
    
    subgraph UL["User Interface"]
        DASH[Dashboard] --- ALERT[Alert System]
        ALERT --- REP[Reports]
    end
    
    CL --> API
    RA --> DL
    DL --> UL
    
    %% Styles
    classDef section fill:#2c3e50,color:#ffffff,stroke:#2c3e50
    classDef client fill:#3498db,color:#ffffff,stroke:#2980b9
    classDef model fill:#2ecc71,color:#ffffff,stroke:#27ae60
    classDef data fill:#e74c3c,color:#ffffff,stroke:#c0392b
    classDef ui fill:#9b59b6,color:#ffffff,stroke:#8e44ad
    
    class CL,ML,DL,UL section
    class MAC,WIN,MOB client
    class API,VM,TM,BM,RA model
    class AUTH,DB,LOGS data
    class DASH,ALERT,REP ui
    
    linkStyle default stroke:#ffffff,stroke-width:2px
```