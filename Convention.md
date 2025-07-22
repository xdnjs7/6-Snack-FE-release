-----

## Frontend Naming Conventions

### Folder & File Naming

  * **Folders**: `kebab-case` (e.g., `user-profiles`, `auth-context`)
  * **Files**:
      * **Component Files**: `PascalCase` (e.g., `UserCard.tsx`, `ProductList.tsx`)
      * **Utility/Helper Files**: `camelCase` (e.g., `form.util.ts`)
  * **Asset Files (Images & Icons)**:
      * **Image Format**: `webp`
      * **Icon Format (for variations)**: `svg` (as SVG components)
      * **Naming**: Use underscores (`_`) (e.g., `user_profile_image.webp`, `arrow_left_icon.svg`)

### Component Naming

  * **General Components**: `PascalCase` (e.g., `UserProfile`, `CommentList`)
  * **Page Components**: End with `Page` (e.g., `CommunityPage`, `ProductDetailPage`)
      * **Example**: For `/app/community/page.tsx`, the component should be named `CommunityPage`.
    <!-- end list -->
    ```tsx
    export default function CommunityPage() {
      return <div>커뮤니티 메인 페이지</div>;
    }
    ```

### Variable & Prop Naming

  * **Variables/Props**: `camelCase` (e.g., `firstName`, `isLoading`)
  * **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_URL`, `DEFAULT_THEME`)
  * **React State Variables (`useState`)**: `camelCase`
      * **Naming**: Use a noun for the variable, `set` prefix for the setter (e.g., `const [count, setCount] = useState(0)`).
  * **Boolean Variables**: Prefix with `is`, `has`, `can` (e.g., `isLoading`, `hasError`, `canSubmit`).
  * **Event Handlers**: Prefix with `handle` (e.g., `handleClick`, `handleSubmit`).
  * **`useRef` Objects**: Suffix with `Ref` (e.g., `inputRef`, `containerRef`).

### Type & Interface Naming

  * **Types/Interfaces**: `PascalCase` (e.g., `UserType`, `PostProps`)

### Function Naming

  * **General Functions**: `camelCase`
      * **Naming**: Start with a verb (e.g., `getUserData`, `calculateTotal`).
  * **Event Handlers**: Start with `handle` (e.g., `handleClick`).
  * **Custom Hooks**: Start with `use` (e.g., `useAuth`, `useFormInput`). Refer to [React documentation on custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks).
  * **Context Provider Functions**: Can use `provide` prefix (e.g., `provideUserContext`).
  * **Principle**: Functions should adhere to the single responsibility principle.

-----

## Frontend File Structure Rules

### File Naming

  * **Component Files**: Must match the exported primary component (e.g., `Button.tsx` for `export default function Button() { ... }`).
  * **Single Component Per File**: Each file should contain only one component.
      * **Good Example**:
        ```tsx
        // UserCard.tsx
        export default function UserCard() {
          return <div>...</div>;
        }
        ```
      * **Bad Example**:
        ```tsx
        // Components.tsx
        export function UserCard() { ... }
        export function UserProfile() { ... }
        ```

### Folder Structure

  * **Folders**: `kebab-case` (e.g., `user-profiles`, `auth-context`)
  * **Example File Structure**:
    ```
    UserCard.tsx
    ProductList.tsx
    ```
  * **Icon Files**:
      * **Directory**: `src/components/svg`
      * **Filename & Component Name**: `[svgName]IconSvg` (e.g., `ArrowIconSvg`, `CartIconSvg`)
      * **Usage**: For icons requiring variations (e.g., color, direction), create an SVG component that accepts props like `fill` or `transform`.
    <!-- end list -->
    ```tsx
    import React from "react";

    export default function CartIconSvg({ fill }: { fill?: string }) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill={fill || "currentColor"} xmlns="http://www.w3.org/2000/svg">
          {/* SVG path data */}
        </svg>
      );
    }
    ```

-----

## Frontend Common Component Development Rules

### `clsx` Library Usage

  * Utilize `clsx` for combining CSS classes dynamically.
  * **Example**:
    ```tsx
    "use client";

    import React from "react";
    import clsx from "clsx";

    interface ButtonProps {
      children: React.ReactNode;
      variant?: "primary" | "secondary" | "outline" | "ghost";
      size?: "sm" | "md" | "lg";
      disabled?: boolean;
      onClick?: () => void;
      type?: "button" | "submit" | "reset";
      className?: string;
    }

    export default function Button({
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      onClick,
      type = "button",
      className,
    }: ButtonProps) {
      const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
      
      const variantStyles = {
        primary: "bg-primary-950 text-white hover:bg-primary-900 focus-visible:ring-primary-950",
        secondary: "bg-primary-100 text-primary-950 hover:bg-primary-200 focus-visible:ring-primary-950",
        outline: "border border-primary-200 bg-transparent hover:bg-primary-50 focus-visible:ring-primary-950",
        ghost: "hover:bg-primary-100 hover:text-primary-950 focus-visible:ring-primary-950",
      };
      
      const sizeStyles = {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-lg",
      };

      const buttonClasses = clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      );

      return (
        <button
          type={type}
          className={buttonClasses}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }
    ```

### Props Type Definition

  * Props types for components should be defined **within the component file**, not in a separate `types` directory.
  * **Rules**:
      * Define types at the top of the component file.
      * Type names should be in the format `T[ComponentName]Props` (e.g., `TTextAreaProps`).
      * Do not separate types into external files unless they are reusable global types.
  * **Example**:
    ```tsx
    // 📁 src/components/TextArea/index.tsx
    import React from 'react';

    type TTextAreaProps = {
      placeholder?: string;
      value?: string;
      onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    };

    export default function TextArea({ 
      placeholder, 
      value, 
      onChange 
    }: TTextAreaProps) {
      return (
        <textarea
          placeholder={placeholder || "메시지를 입력해주세요"}
          value={value}
          onChange={onChange}
          className="w-[570px] h-40 p-6 bg-white rounded-sm border border-neutral-300 text-base text-neutral-800 resize-none focus:outline focus:outline-2 focus:outline-blue-400 placeholder:text-neutral-400"
        />
      );
    }
    ```

### Boilerplate Usage

  * When creating a new `.tsx` file, use the `rfc + tab` boilerplate: `export default function [ComponentName]()`.

-----

## Frontend Responsive Design Rules

### Mobile First Approach

  * **Principle**: Apply mobile styles by default, then override them for tablet (`sm:`) and desktop (`md:`) using Tailwind CSS breakpoints.
  * **Example**:
    ```html
    <div class="text-sm sm:text-base md:text-lg">텍스트</div>
    ```
      * **Mobile**: `text-sm`
      * **Tablet (sm and above)**: `text-base`
      * **Desktop (md and above)**: `text-lg`

### Breakpoint Standards

  * Breakpoints are defined in `globals.css`.
  * **Mobile**: No breakpoint prefix needed.
  * **Tablet**: `sm:` (corresponds to `--breakpoint-sm` at `744px`)
  * **Desktop**: `md:` (corresponds to `--breakpoint-md` at `1400px`)

### Color Usage

  * Use CSS variables defined in `globals.css` for all colors. **Do not use direct hex values.**
  * Apply colors using Tailwind's `text-[variable-name]`, `bg-[variable-name]` syntax.
  * **Example**:
    ```html
    <button class="bg-primary-500 text-primary-300">
      버튼
    </button>
    ```
  * **Key Color Variables Examples**:
      * `--color-primary-500`: Gray-scale base color
      * `--color-secondary-500`: Sub color (blue-ish)
      * `--color-error-500`: Red for error messages
      * `--color-white` / `--color-black`: Basic background/text colors

### Font Usage

  * Fonts are managed globally (e.g., `--font-suit` in `globals.css`) and applied to the `body` by default. No separate configuration is usually needed.

-----

## Backend Naming Conventions (Prisma ORM)

### Prisma ORM Naming

  * **Models**: `PascalCase` singular nouns (e.g., `User`, `Post`, `Comment`)
  * **Fields**: `camelCase` (e.g., `firstName`, `createdAt`, `userId`)
  * **Enums**: `PascalCase` (e.g., `Role`, `PostStatus`)
  * **Enum Values**: `UPPER_SNAKE_CASE` (e.g., `ADMIN`, `USER_BASIC`)
  * **Relations**: `camelCase`, often reflecting the related model (e.g., `posts` for a `User`'s posts)

-----

## Backend Directory & File Naming Rules

### File Naming by Directory

  * `middlewares`: `[name].middleware.ts` (e.g., `errorHandler.middleware.ts`)
  * `routes`: `[name].route.ts` (e.g., `auth.route.ts`)
  * `controllers`: `[name].controller.ts` (e.g., `auth.controller.ts`)
  * `services`: `[name].service.ts` (e.g., `auth.service.ts`)
  * `repositories`: `[name].repository.ts` (e.g., `auth.repository.ts`)
  * If names are long, use `camelCase` (e.g., `errorHandler`).

-----

## Backend Error Handling

### Error Handler Definition

  * Use `ErrorRequestHandler` for type safety.
  * The error response should include `path`, `method`, `message`, `data`, and `date`.

<!-- end list -->

```typescript
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.code ?? 500;

  res.status(status).json({
    path: req.path,
    method: req.method,
    message: error.message ?? "예상치 못한 오류가 발생했습니다.",
    data: error.data ?? undefined,
    date: new Date(),
  });
}

export default errorHandler;
```

### Error Types

  * All custom errors should extend `AppError`.
  * Common error classes for specific HTTP status codes are provided.

<!-- end list -->

```typescript
export class AppError extends Error {
  code?: number;
  data?: any;

  constructor(message: string, code?: number, data?: any) {
    super(message);
    this.code = code;
    this.data = data;
    this.name = "AppError";
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, data?: any) {
    super(message, 400, data);
    this.name = "BadRequestError";
  }
}

// ... other error classes (AuthenticationError, ForbiddenError, NotFoundError, ValidationError, ServerError)
```

### Error Handling Usage

  * Throw appropriate custom error types when an error condition is met.

<!-- end list -->

```typescript
  if (!order) {
    throw new NotFoundError("해당 주문 내역을 찾을 수 없습니다.");
  }
```

-----

## Backend Function, Import, Export Conventions

### Function Definition Style

  * `router`: Not an arrow function.
  * `controller`, `service`, `repository`, `middleware`: Arrow functions.

### Import / Export Method

  * Write functions as arrow functions.

  * Use `export default` at the end of the file to export all functions collectively, rather than exporting each function individually.

  * **Example**:

    ```
    // src/services/auth.service.js
    import bcrypt from 'bcrypt';

    const login = async (email, password) => {
      // login logic
    };

    const register = async (email, password) => {
      // register logic
    };

    export default {
      login,
      register,
    };

    // src/controllers/auth.controller.js
    import authService from '../services/auth.service.js';
    import { RequestHandler } from 'express'; // Assuming RequestHandler is imported

    export const loginController: RequestHandler = async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
      } catch (err) {
        next(err); // Use next(err) for error handling
      }
    };

    export const registerController: RequestHandler = async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const result = await authService.register(email, password);
        res.status(201).json(result);
      } catch (err) {
        next(err); // Use next(err) for error handling
      }
    };
    ```

-----

## Backend Repository $transaction Convention

### Repository Level Design

  * Functions that might be part of a transaction should accept an optional `tx` (Prisma TransactionClient) parameter.

  * Use `const client = tx || prisma;` to determine whether to use the transaction client or the global Prisma client.

  * **Example**:

    ```typescript
    import { PrismaClient, Prisma } from '@prisma/client';

    const prisma = new PrismaClient(); // Assuming a global prisma instance

    const createProduct = async (foo: any, tx?: Prisma.TransactionClient) => {
      const client = tx || prisma;

      return await client.order.findMany(); // Example usage
    };

    export default { createProduct };
    ```

### Service Level Usage

  * Wrap repository calls that need to be transactional within `prisma.$transaction`.

  * **Example**:

    ```typescript
    import productRepository from './path/to/product.repository'; // Adjust path
    import { PrismaClient } from '@prisma/client';

    const prisma = new PrismaClient();

    const createProductService = async (input: any) => {
      return await prisma.$transaction(async (tx) => {
        await productRepository.createProduct(input, tx);
        // ... other transactional operations
      });
    };

    export default { createProductService };
    ```

-----

## Backend DTO (Data Transfer Object) Usage

### DTO Purpose

  * To explicitly define the shape of incoming user data.

### DTO Rules

  * **Location**: `src/dtos`

  * **Naming**: `export type T[Name]Dto` (e.g., `TCreateProductDto`). Use `type` keyword, not `interface`.

  * **Example DTO**:

    ```typescript
    // dtos/create-product.dto.ts
    export type TCreateProductDto = {
      name: string;
      price: number;
    };
    ```

-----

## Backend Controller Rules

### 1\. Type Conversion with `parseNumberOrThrow`

  * **Purpose**: Safely convert string values (from frontend) to numbers and handle errors.
  * **Location**: `src/utils/parseNumberOrThrow.ts`
  * **`parseNumberOrThrow.ts` Example**:
    ```typescript
    // utils/parseNumberOrThrow.ts
    export function parseNumberOrThrow(value: string | undefined, fieldName: string): number {
      const parsed = Number(value);
      if (isNaN(parsed)) {
        throw new Error(`${fieldName} must be a number`);
      }
      return parsed;
    }
    ```
  * **Controller Usage Example**:
    ```typescript
    import { parseNumberOrThrow } from '@/utils/parseNumberOrThrow'; // Adjust path

    const productId = parseNumberOrThrow(req.params.id, 'productId');
    ```

### 2\. User Input Type Specification with DTO

  * **Purpose**: Clearly separate controller responsibility and define request data structure. All user input types must be defined in DTO files.
  * **Location Example**: `src/dtos/product.dto.ts`
  * **Type Definition & Naming Rule**: Use `type` and `T[Name]Dto`.
  * **Controller Usage Example**:
    ```typescript
    import { TCreateProductDto } from '@/dtos/create-product.dto'; // Adjust path

    const { name, price }: TCreateProductDto = req.body;
    ```

### 3\. `RequestHandler` for `req`, `res`, `next` Types (Arrow Function Version)

  * **Purpose**: Explicitly type Express objects (`req`, `res`, `next`) and maintain consistent arrow function style.
  * **Example**:
    ```typescript
    import { RequestHandler } from 'express';

    export const createProductController: RequestHandler = async (req, res, next) => {
      try {
        // Controller logic
        res.status(201).json({ message: 'Product created' });
      } catch (err) {
        next(err); // Pass error to the error handling middleware
      }
    };
    ```

-----

## API Specification Rules

### DELETE Request Response Convention

  * After a `DELETE` request, return a `200 OK` status code with a response body.

  * **Example**:

    ```
    DELETE /companies/123

    HTTP/1.1 200 OK
    Content-Type: application/json

    {
      "message": "[xx]가 성공적으로 처리 되었습니다",
    }
    ```

-----

## PR (Pull Request) Guidelines

### Checklist Before Creating PR

  * Always run `npm run build` locally to ensure no build errors. PRs with build errors will not be reviewed.

### PR Creation & Merge Rules

#### Merge Strategy

  * Follow the Git Flow Merge strategy.

#### PR Cycle & Time

  * Daily PR review and merge session at **1 PM KST**.
  * Actively participate in the 1 PM review, thoroughly review assigned PRs, and leave comments.
  * Urgent matters can be handled with PR requests outside of the 1 PM slot.

### PR Writing Guidelines

#### Title

  * PR title must be identical to the commit message.
  * For multiple commits: `commit title: content [author name]`

#### Label

  * Assign relevant labels.

#### Assignee

  * Assign yourself.

#### Reviewer

  * Assign **one** coding pair partner from the predefined list:
      * **Author** | **Reviewer**
      * 김홍섭 | 이지수
      * 이태빈 | 장원빈
      * 김우주 | 조성빈

### Guide for PR Reviewers

#### Upon Receiving PR Request

  * React with a ✅ emoji to the PR request message to indicate **"Under Review"**.
  * **Scenario Example**: Hongseop sends a PR request to Jisoo and Taebin -\> Jisoo and Taebin react with ✅ -\> Other team members can instantly see the "Under Review" status.

#### Review Process

  * Review in GitHub's "Files changed" tab.
  * If possible, leave comments directly on specific lines of code.

#### Approval (Approve) Criteria

  * No changes are required in the code, and only suggestions for further improvements are provided in comments.
  * After review, notify the PR author that the review is complete.

#### Hold for Approval (Changes Requested) Criteria

  * Code violates team conventions or contains clear issues/bugs.
  * Provide clear comments on what needs to be fixed and how.
  * The team member will fix, and the reviewer will re-approve.

### Post-Merge Cleanup

#### After Merging a PR

  * Always **delete the branch** after merging to avoid confusion in management.
  * Notify in the \#PR channel on Discord: `OO님 PR 머지 완료했습니다.` (e.g., `Jisoo's PR merged.`)

#### After Sending a PR

  * Tag the reviewer in the \#PR channel on Discord with a message: `PR 리뷰 부탁드립니다 🙏` (e.g., `Please review PR 🙏 @reviewer_name`)

-----

## Other Project Conventions

### `.prettierrc`

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "bracketSpacing": true,
  "trailingComma": "all"
}
```

  * **`printWidth`: 120**: Maximum line length before wrapping.
  * **`tabWidth`: 2**: Indent with 2 spaces.
  * **`useTabs`: false**: Use spaces instead of tabs for indentation.
  * **`semi`: true**: Always add semicolons at the end of statements.
  * **`singleQuote`: false**: Use double quotes for strings.
  * **`bracketSpacing`: true**: Add spaces inside object literals. (e.g., `{ foo: bar }`)
  * **`trailingComma`: "all"**: Add trailing commas wherever possible (arrays, function arguments).

### Branch Naming

  * `feat/landing`
  * `feat/auth`
  * `feat/modal`
  * `feat/product`
  * `feat/invite`
  * `feat/cart-[detailed-feature]` (e.g., `feat/cart-item-removal`)

### Next.js Pack

  * Use `Turbo pack`.

### Import Paths

  * Use **absolute paths** for distant imports (e.g., `import { Button } from '@/components/ui/button'`).
  * Use **relative paths** for nearby imports (e.g., `import { helperFunction } from './utils'`).
  * **Rule of Thumb**: Start with relative paths for close files, and switch to absolute paths if they become distant. If a path is currently distant, use an absolute path.

### Commit Convention

  * Follow a consistent commit message convention (not explicitly detailed here, but implied by PR title rule).

### `.gitignore`

```
.env
*.http
node_modules
.next/
# Backend ignore
# .gitignore

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Dependency directories
node_modules/
jspm_packages/

# TypeScript cache
*.tsbuildinfo

# Environment variables
.env
.env.*.local
.env.local

# Build outputs
/dist
/build
/src/generated/prisma
```