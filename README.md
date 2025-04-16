# Angular E-commerce Electronics Store with Authentication and Order Management

An Angular-based e-commerce platform that provides a seamless shopping experience for electronics products with secure user authentication, shopping cart management, and order processing capabilities.

This project implements a modern e-commerce solution using Angular 17+ with standalone components. It features a comprehensive authentication system powered by Supabase, real-time cart management, and a membership rewards system. The application provides an intuitive user interface with Bootstrap styling and Font Awesome icons, making it both functional and visually appealing.

## Repository Structure
```
angular-project/
├── src/                          # Source code directory
│   ├── app/                      # Application core components
│   │   ├── components/          # Feature components (login, register, product-card, etc.)
│   │   ├── models/             # Data models and interfaces
│   │   └── services/           # Authentication, product, and order services
│   ├── environments/            # Environment configuration files
│   ├── assets/                 # Static assets (images, icons)
│   └── styles.css              # Global styles
├── angular.json                 # Angular CLI configuration
├── package.json                # Project dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## Usage Instructions
### Prerequisites
- Node.js (v16.x or higher)
- npm (v8.x or higher)
- Angular CLI (v17.x)
- A Supabase account and project for authentication

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd angular-project

# Install dependencies
npm install

# Set up environment variables
# Create src/environments/environment.ts with your Supabase credentials:
export const environment = {
  production: false,
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseAnonKey: 'YOUR_SUPABASE_ANON_KEY',
  signUpRedirectUrl: 'YOUR_SIGNUP_REDIRECT_URL',
  resetPasswordRedirectUrl: 'YOUR_RESET_PASSWORD_REDIRECT_URL'
};

# Start the development server
ng serve
```

### Quick Start
1. Register a new account:
```typescript
// Navigate to /register and fill in the registration form
this.authService.signUp(username, email, password)
```

2. Login to your account:
```typescript
// Navigate to /login and enter your credentials
this.authService.signIn(email, password)
```

3. Browse products and add them to cart:
```typescript
// Add product to cart
this.productService.addToCart(product)
```

### More Detailed Examples
1. Managing the shopping cart:
```typescript
// Add item to cart
addToCart(product: Product) {
  this.cartItems.unshift(product);
}

// Remove item from cart
removeProduct(index: number) {
  this.cartItems.splice(index, 1);
}
```

2. Placing an order:
```typescript
onPlaceOrder() {
  this.orderService.placeOrder({
    userId: currentUserId,
    userName: currentUserName,
    totalPrice: this.getTotalPrice(),
    totalQuantity: this.getTotalQuantity(),
    orderItems: this.cartItems
  });
}
```

### Troubleshooting
1. Authentication Issues
   - Error: "Invalid login credentials"
   - Solution: Verify email and password combination
   - Check if email is verified in Supabase dashboard

2. Cart Management Issues
   - Problem: Items not appearing in cart
   - Solution: Check browser console for errors
   - Verify product service subscription is active

## Data Flow
The application follows a unidirectional data flow pattern where user actions trigger service methods that interact with the backend through Supabase.

```ascii
User Action → Component → Service → Supabase API
     ↑                                    ↓
     └────────── State Update ───────────┘
```

Key component interactions:
1. Authentication flow through AuthService and Supabase
2. Product management through ProductService
3. Order processing through OrderService
4. Cart state management in AppComponent
5. Real-time updates using Supabase subscriptions
6. Route protection using AuthGuard
7. Membership status tracking through OrderService