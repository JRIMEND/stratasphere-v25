# StrataSphere v25

## Volumetric Property Management Platform for Queensland

**By Black Sheep Innovation**

StrataSphere is a cutting-edge volumetric property management platform that combines traditional property management with 3D volumetric title management, drone compliance (CASA/FIMS), and digital twin visualization.

### Features

- **Property Management**: 7 property types (balance lot, apartment, retail, farm, residential, commercial, industrial)
- **Tenant Portal**: Full tenant management with rent tracking, bond management, and portal access
- **Maintenance Hub**: Kanban board work order system with contractor directory
- **Leasing Manager**: Lease lifecycle management with expiry tracking
- **Utility Hub**: Electricity, water, gas, solar, EV charging management
- **Body Corporate**: Committee management, by-laws, motions, financial reports
- **CASA/FIMS Integration**: Drone fleet management, airspace authorizations, compliance tracking
- **Volumetric Title Manager**: 3D dimension management (D1-D6), title plans, enforcement actions
- **Digital Twin**: Canvas 2D property visualization with zoom and layer controls
- **Revenue Explorer**: Traditional + volumetric revenue analytics
- **Compliance Dashboard**: QLD regulatory compliance tracking

### Security

- PBKDF2 password hashing (100,000 iterations)
- AES-256-GCM encrypted localStorage
- 24-hour session timeout
- Rate limiting (5 failed login attempts = 5min lockout)
- Error boundaries on every module

### Demo Credentials

- admin@stratasphere.com.au / admin123
- manager@stratasphere.com.au / manager123

### Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS + shadcn/ui components
- Recharts for data visualization
- Framer Motion for animations
- Lucide React icons

### Live Demo

https://6s53ga7m5nbpy.kimi.page
