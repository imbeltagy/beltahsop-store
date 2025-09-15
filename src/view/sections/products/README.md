# Products Page

This directory contains the products page implementation with advanced filtering capabilities.

## Features

### Search & Filtering

- **Debounced Search**: Real-time search with 500ms debounce
- **Category Filtering**: Autocomplete search for categories
- **Subcategory Filtering**: Autocomplete search for subcategories
- **Brand Filtering**: Autocomplete search for brands
- **Tag Filtering**: Autocomplete search for tags
- **Label Filtering**: Autocomplete search for labels
- **Price Range**: Min/max price filtering with range slider

### UI Components

- **Filter Sidebar**: Collapsible filters on the left
- **Products Grid**: Responsive grid layout (1-4 columns)
- **Active Filter Chips**: Visual representation of applied filters
- **Pagination**: Page navigation for large result sets
- **Loading States**: Skeleton loaders for better UX

### API Integration

- **Server Actions**: All API calls use Next.js server actions
- **Caching**: 1-hour cache for better performance
- **Error Handling**: Graceful error handling with fallbacks

## File Structure

```
src/view/sections/products/
├── view/
│   └── index.tsx              # Main products view
├── filters.tsx                # Filter sidebar component
├── products-list.tsx          # Products grid and pagination
├── loading/
│   └── ProductsListLoading.tsx # Loading skeleton
└── README.md                  # This file
```

## Usage

The products page is accessible at `/products` and includes:

1. **Search Bar**: Type to search products by name/description
2. **Category Selection**: Choose from available categories
3. **Subcategory Selection**: Filter by subcategories
4. **Brand Selection**: Filter by product brands
5. **Tag Selection**: Filter by product tags
6. **Label Selection**: Filter by product labels
7. **Price Range**: Set min/max price with slider
8. **Clear Filters**: Remove all applied filters at once

## API Endpoints

The following API endpoints are used:

- `/categories` - Get categories
- `/subcategories` - Get subcategories
- `/brands` - Get brands
- `/tags` - Get tags
- `/labels` - Get labels
- `/products` - Get filtered products

All endpoints support:

- `page` - Page number
- `limit` - Items per page
- `search` - Search term
- `category` - Category ID filter
- `subCategory` - Subcategory ID filter
- `brand` - Brand ID filter
- `tag` - Tag ID filter
- `label` - Label ID filter
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
