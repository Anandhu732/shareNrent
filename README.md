# share-n-rent - Item Rental Platform

Share-N-Rent is a modern web application that allows users to rent items from people in their community. It helps users save money and reduce waste by enabling a sharing economy.

## Features

- **User Authentication**: Secure sign-in with email/password or Google OAuth
- **Item Listings**: Browse, search, and filter available items by category
- **Messaging System**: Direct communication between renters and owners
- **Dashboard**: Personalized user dashboard to manage listings and rentals
- **Profile Management**: Edit personal information and preferences
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Technologies Used

- **Frontend**: Next.js, React, TailwindCSS
- **Authentication**: NextAuth.js
- **UI Components**: React Icons, Custom Tailwind components
- **Styling**: TailwindCSS with custom animations
- **Form Handling**: React state management

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/share-n-rent.git
   cd share-n-rent
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env.local` file and add the following variables:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_next_auth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run the development server
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js App Router pages and layouts
- `/src/components` - Reusable React components
- `/src/components/auth` - Authentication components
- `/src/components/messaging` - Messaging system components
- `/public` - Static assets

## Deployment

This application can be easily deployed to Vercel, Netlify, or any other Next.js-compatible hosting service.

```
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js documentation
- TailwindCSS community
- NextAuth.js documentation
