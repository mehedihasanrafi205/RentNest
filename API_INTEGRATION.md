# API Integration Documentation

**Project:** RentNest Frontend  
**Backend API:** https://rent-nest-backend.vercel.app  
**Backend Repo:** https://github.com/mehedihasanrafi205/RentNest-backend

---

## Base URL

```
BACKEND_API_URL=https://rent-nest-backend.vercel.app
```

Configured in `.env` as `BACKEND_API_URL`. All server actions use this variable.

---

## Authentication

| Frontend Component / Action | HTTP Method | Endpoint | Description |
|---|---|---|---|
| `LoginForm.tsx` → `loginAction()` | `POST` | `/auth/login` | Authenticate user, store `accessToken` + `refreshToken` in httpOnly cookies |
| `RegisterForm.tsx` → `registerAction()` | `POST` | `/auth/register` | Create new account with `name`, `email`, `password`, `role` |
| `logoutAction()` | — | (cookie delete) | Clears `accessToken` & `refreshToken` cookies, revalidates cache |
| `service/getme.ts` → `getMe()` | `GET` | `/users/me` | Fetch current user profile using `accessToken` cookie |

**Token Storage:** Cookies (`accessToken`, `refreshToken`) — httpOnly, secure in production  
**Route Protection:** `proxy.ts` (Next.js middleware) — JWT decode + RBAC redirect

---

## Public / Properties

| Frontend Component / Action | HTTP Method | Endpoint | Description |
|---|---|---|---|
| `FeaturedProperties.tsx` → `getAllPropertiesAction()` | `GET` | `/properties?limit=6` | Home page featured listings |
| `AllProperties.tsx` → `getAllPropertiesAction()` | `GET` | `/properties?location=&minPrice=&maxPrice=` | Browse & filter all properties |
| `properties/[id]/page.tsx` → `getIndividualPropertyAction()` | `GET` | `/properties/:id` | Single property detail page |

**Caching:** Properties list uses `revalidate: 60` (1 min ISR). Individual property uses `no-store`.

---

## Tenant Dashboard

| Frontend Component / Action | HTTP Method | Endpoint | Description |
|---|---|---|---|
| `BookingButton.tsx` → `createBookingAction()` | `POST` | `/bookings/book-property` | Tenant submits rental request for a property |
| `BookingsView.tsx` → `getMyBookingsAction()` | `GET` | `/bookings/my-bookings` | Fetch all tenant bookings with status |
| `BookingCard.tsx` → `createCheckoutSessionAction()` | `POST` | `/payments/create-checkout-session` | Generate Stripe Checkout URL for approved booking |
| `PaymentsView.tsx` → `getMyPaymentsAction()` | `GET` | `/payments/my-payments` | Fetch tenant payment history |
| `ReviewsView.tsx` → `submitReviewAction()` | `POST` | `/reviews` | Submit rating + comment for a rented property |

**Payment Flow:**
1. Tenant sees "Pay Now" on APPROVED booking
2. `createCheckoutSessionAction(bookingId)` hits `/payments/create-checkout-session`
3. Backend returns Stripe Checkout URL → `window.location.href = url`
4. Stripe redirects to `/payments/success` or `/payments/cancel`

---

## Landlord Dashboard

| Frontend Component / Action | HTTP Method | Endpoint | Description |
|---|---|---|---|
| `landlord/page.tsx` → `getLandlordProperties()` | `GET` | `/properties?landlordId=:id` | Fetch landlord's own property listings |
| `LandlordPropertiesTable.tsx` → `createPropertyListing()` | `POST` | `/properties/create-listing` | Create new property listing |
| `LandlordRequestsTable.tsx` → `getLandlordRequests()` | `GET` | `/bookings/landlord-requests` | Fetch all incoming rental requests |
| `LandlordRequestsTable.tsx` → `updateBookingStatus()` | `PATCH` | `/bookings/:id/update-status` | Approve or reject a rental request |

---

## Admin Dashboard

| Frontend Component / Action | HTTP Method | Endpoint | Description |
|---|---|---|---|
| `admin/page.tsx` → `getAdminStats()` | `GET` | `/admin/stats` | Platform-wide stats (users, properties, rentals) |
| `AdminUsersTable.tsx` → `getAllUsers()` | `GET` | `/users` | List all registered users |
| `AdminUsersTable.tsx` → `toggleUserBanStatus()` | `PATCH` | `/users/:id/ban` | Ban or unban a user |
| `AdminPropertiesTable.tsx` → `getAllProperties()` | `GET` | `/properties?limit=100` | List all property listings for moderation |
| `AdminPropertiesTable.tsx` → `deletePropertyAdmin()` | `DELETE` | `/properties/:id` | Remove a property listing |

---

## Payment Pages

| Route | Description |
|---|---|
| `/payments/success` | Shown after successful Stripe checkout. Links to payment history and bookings. |
| `/payments/cancel` | Shown when Stripe checkout is cancelled or fails. Links back to bookings. |

---

## Route Protection (proxy.ts / middleware)

| Route Pattern | Protection | Logic |
|---|---|---|
| `/login`, `/register` | Redirect if logged in | Logged-in users → role-based dashboard redirect |
| `/dashboard/tenant/*` | Requires `TENANT` role | Others → redirect to `/` |
| `/dashboard/landlord/*` | Requires `LANDLORD` role | Others → redirect to `/` |
| `/dashboard/admin/*` | Requires `ADMIN` role | Others → redirect to `/` |
| All other protected routes | Requires valid JWT | Unauthenticated → redirect to `/login?redirectTo=...` |

JWT is decoded on the Edge Runtime (no secret needed) to check `role` and `exp`.

---

## Error Handling

All API errors surface as **Sonner toast notifications**:
- `toast.success()` — successful actions
- `toast.error()` — failed API calls
- `toast()` with action buttons — destructive confirmations (delete, ban)

`error.tsx` — global error boundary with retry  
`not-found.tsx` — 404 fallback  
`loading.tsx` — global loading state

---

## Credentials (for Testing)

```
Admin Email    : admin@rentnest.com
Admin Password : admin123
```


