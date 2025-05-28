# Layout Components

Reusable layout components for consistent styling and better maintainability.

## Components

### ContentMain
Main content wrapper for pages. Provides semantic `<main>` element for SEO.

```jsx
import { ContentMain } from '../components/layout';

<ContentMain align="left" background="dark">
  <YourPageContent />
</ContentMain>
```

### ContentSection
Reusable section wrapper for content sections within pages.

```jsx
import { ContentSection } from '../components/layout';

<ContentSection id="about" align="center" background="course">
  <YourSectionContent />
</ContentSection>
```

## Props

### Common Props (both components)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Content to render |
| `align` | string | 'left' | Text alignment: 'left', 'center', 'right' |
| `background` | string | 'dark' | Background variant (see below) |
| `className` | string | '' | Additional CSS classes |
| `fullWidth` | boolean | false | Use full width layout |

### ContentSection Additional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | - | Section ID for navigation/anchoring |

## Background Variants

| Variant | Description |
|---------|-------------|
| `dark` | Dark background with white text (default) |
| `course` | Course image background with white text |
| `about` | About image background with white text |
| `instructors` | Instructors image background with white text |
| `white` | White background with dark text |
| `black` | Black background with white text |
| `gradient` | Gradient background (shine to shineDark) |
| `transparent` | No background (ContentSection only) |

## Examples

### Basic Page Layout
```jsx
import { ContentMain } from '../components/layout';

const MyPage = () => (
  <Layout>
    <ContentMain background="dark" align="left">
      <h1>Page Title</h1>
      <p>Page content...</p>
    </ContentMain>
  </Layout>
);
```

### Multi-Section Page
```jsx
import { ContentMain, ContentSection } from '../components/layout';

const MyPage = () => (
  <Layout>
    <ContentMain>
      <ContentSection id="intro" background="dark">
        <h1>Introduction</h1>
      </ContentSection>
      
      <ContentSection id="about" background="course">
        <h2>About Us</h2>
      </ContentSection>
      
      <ContentSection id="contact" background="white" align="center">
        <h2>Contact</h2>
      </ContentSection>
    </ContentMain>
  </Layout>
);
```

### Component Integration
```jsx
import { ContentSection } from './layout';

export const MyComponent = () => (
  <ContentSection background="instructors" fullWidth>
    <h2>Component Title</h2>
    <p>Component content...</p>
  </ContentSection>
);
```

## SEO Benefits

- **Semantic HTML**: Uses proper `<main>` and `<section>` elements
- **Better Structure**: Clear content hierarchy for search engines
- **Accessibility**: Proper landmarks for screen readers
- **Consistent Styling**: Unified appearance across the site

## Migration Guide

### Before (Old Pattern)
```jsx
<main className="bg-almostBlack text-white py-10 md:py-10 lg:py-30 justify-between md:items-start">
  <section className="text-left bg-courseImage text-white px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start">
    Content...
  </section>
</main>
```

### After (New Pattern)
```jsx
import { ContentMain, ContentSection } from '../components/layout';

<ContentMain>
  <ContentSection background="course" align="left">
    Content...
  </ContentSection>
</ContentMain>
```

## Utility Script

Use the included script to find remaining patterns that need refactoring:

```bash
node scripts/find-layout-patterns.js
``` 