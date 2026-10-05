# RentIt

**Full-Stack Web App · ASP.NET Core 8 · Angular 19 · JWT Auth · EF Core · SQL Server**

## Overview
RentIt is a full-stack product rental platform built as a monorepo with an Angular 19 SPA frontend and an ASP.NET Core 8 REST API backend. Users can browse and filter listings, publish rental offers with image upload, manage their own products, submit reviews, save favorites, and track rental activity — all behind JWT-authenticated routes.

Developed in a structured team environment mirroring real-world Agile workflows — planning, implementation, integration, QA, and delivery phases with clear role ownership.

## Features
* **Product Catalog:** Browse listings with search, category filter, price range, location, rating, and sort options.
* **Listing Management:** Add products with image upload (multipart/form-data), edit, and delete own listings.
* **Rental Flow:** Date-range selection, total price calculation, and rental status tracking (States enum).
* **Reviews & Ratings:** 1–5 star reviews with comments per product, linked to authenticated users.
* **Favorites System:** Save and manage favorite listings per user account.
* **JWT Authentication:** Secure register/login, with tokens stored and auto-attached via HTTP interceptors.
* **Account Management:** View and edit profiles, change passwords.

## Architecture

### Backend — ASP.NET Core 8
* RESTful API (6 main controllers)
* JWT Bearer authentication & BCrypt password hashing
* Entity Framework Core 8 (Code-First) + SQL Server
* Service layer pattern (Dependency Injection with interfaces)
* DTO pattern (15+ Data Transfer Objects for secure data mapping)
* Static file serving for image uploads
* Swagger UI integrated with Bearer Auth documentation

### Frontend — Angular 19
* Standalone lazy-loaded components
* Angular Router with AuthGuard
* HTTP Interceptor (JWT injection)
* Reactive Forms + validation
* Angular Material + Tailwind CSS 4

## API Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login, returns JWT | No |
| GET | `/api/products` | List products with filters | No |
| POST | `/api/products` | Create listing + image upload | Yes |
| GET/PUT/DELETE | `/api/products/{id}` | Product CRUD operations | Yes |
| GET/POST | `/api/rentals` | Rental management | Yes |
| GET/POST | `/api/review` | Product reviews | Yes |
| GET/POST/DELETE | `/api/favorite`| Favorites management | Yes |
| GET/PUT | `/api/user` | Account management | Yes |

## Tech Stack
**Backend:** ASP.NET Core 8 (.NET 8) · Entity Framework Core 8 · SQL Server · BCrypt.Net-Next 4.0 · Swashbuckle / Swagger 6.6 · System.IdentityModel.Tokens.Jwt 8  
**Frontend:** Angular 19.2 · TypeScript 5.7 · Angular Material 19 · Tailwind CSS 4.1 · RxJS 7.8

## Team Structure
| Role | Responsibilities |
|------|------------------|
| Team Leader | Planning & coordination |
| **Backend Developer** | **API architecture, EF Core, JWT, Database (My Role)** |
| Frontend Developer | Angular SPA, routing, API integration |
| QA Tester | Testing & validation |

## My Contributions (Backend Developer)
As the sole Backend Developer for this project, I engineered the entire server-side architecture from scratch:
* **RESTful API Architecture:** Designed and implemented a robust ASP.NET Core 8 Web API, cleanly separated into Controllers and Services using Dependency Injection.
* **Relational Database Design:** Engineered the SQL Server database schema using Entity Framework Core (Code-First approach), establishing complex relationships between Users, Products, Categories, Rentals, Reviews, and Favorites.
* **Security & Authentication:** Implemented JWT (JSON Web Token) authentication for route protection and utilized BCrypt for secure password hashing.
* **Data Transfer Objects (DTOs):** Created over 15 DTOs to decouple internal database entities from API responses, preventing over-posting and ensuring secure data transmission.
* **File Upload Logic:** Built the `multipart/form-data` handling for product image uploads, safely generating unique filenames and serving them as static files to the frontend.
* **API Documentation:** Configured Swagger UI with JWT Bearer token support, allowing the frontend developer to easily test and integrate authenticated endpoints.

## Getting Started

### Prerequisites
* Node.js (v18+)
* .NET 8 SDK
* SQL Server (Express / Developer / LocalDB)

### Installation

**1. Configure connection string**
Update your `appsettings.json` file in the server project:
`"RentItConnectionString": "Server=...;Database=RentIt;..."`

**2. Setup and Run**
Execute the following commands in your terminal:

```bash
# Apply database migrations
dotnet ef database update

# Run the backend (API)
dotnet run --project RentApp.Server

# Open a NEW terminal for the frontend
cd rentapp.client
npm install
npm start
