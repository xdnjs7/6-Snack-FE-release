---

# 프로젝트 컨벤션 가이드라인

이 문서는 프론트엔드 및 백엔드 개발 시 지켜야 할 주요 컨벤션과 코드 스타일 규칙을 정의합니다.

---

## 1. 프론트엔드

### 1.1. 네이밍 컨벤션

- **폴더**: 케밥 케이스 (`kebab-case`)
    - 예시: `user-profiles`, `auth-context`
- **파일**: 카멜 케이스 (`camelCase`) (단, 컴포넌트 파일은 예외)
- **에셋 파일 (이미지, 아이콘)**
    - 이미지 파일 형식: `webp`
    - 아이콘 파일 형식: `svg`
    - 네이밍: 언더스코어 (`_`) 활용
- **컴포넌트 이름**: 파스칼 케이스 (`PascalCase`)
    - 예시: `UserProfile`, `CommentList`
- **페이지 컴포넌트**: `~Page` 접미사 사용TypeScript
    - 예시: `/app/community/page.tsx`의 경우 `CommunityPage`
    
    # 
    
    `export default function CommunityPage() {
      return <div>커뮤니티 메인 페이지</div>;
    }`
    
- **변수/Props**: 카멜 케이스 (`camelCase`)
    - 예시: `firstName`, `isLoading`
- **타입/인터페이스**: 파스칼 케이스 (`PascalCase`)
    - 예시: `UserType`, `PostProps`
- **상수**: 밑줄로 구분된 대문자 (`UPPER_SNAKE_CASE`)
    - 예시: `API_URL`, `DEFAULT_THEME`
- **파일 (컴포넌트)**: 컴포넌트 이름과 일치하는 파스칼 케이스 (`PascalCase`)
    - 예시: `UserProfile.tsx` (내부 컴포넌트가 `UserProfile`일 경우)
- **커스텀 Hook**: `use` 접두사로 시작
    - 참고: [React 공식 문서 - Reusing Logic with Custom Hooks](https://ko.react.dev/learn/reusing-logic-with-custom-hooks)

### 1.2. 변수 (Variables)

- **케이스 규칙**
    - 일반 변수: `camelCase`
    - 상수: `UPPER_SNAKE_CASE`
    - React 상태 변수 (`useState`): `camelCase`
- **명명 규칙**
    - 의미 있고 설명적인 이름 사용
    - `useState` 변수: 명사, 설정자 (`setter`)는 `set` 접두사
    - Boolean 변수: `is`, `has`, `can` 등의 접두사
    - 이벤트 핸들러: `handle` 접두사
    - `useRef` 객체: `Ref` 접미사

### 1.3. 함수 (Functions)

- **케이스 규칙**: `camelCase`
- **명명 규칙**
    - 동사로 시작
    - 이벤트 핸들러: `handle`로 시작
    - 커스텀 훅: `use`로 시작
    - **단일 책임 원칙 (Single Responsibility Principle)** 준수
    - 예외: Context Provider 함수는 `provide` 접두사 사용 가능 (예: `provideUserContext`)

### 1.4. 컴포넌트 (React Components)

- **케이스 규칙**
    - 컴포넌트 및 파일 이름: `PascalCase`
- **명명 규칙**
    - 명사형 이름 사용 (역할 반영)
    - 페이지 컴포넌트: `Page` 접미사
    - 공통 UI 컴포넌트: 일반적인 이름 사용
- **파일 확장자**: `.tsx`
- **예시 파일 구조**
    
    `UserCard.tsx
    ProductList.tsx`
    

### 1.5. 파일 구조

- **파일명 케이스**
    - 컴포넌트 파일: `PascalCase` → `UserCard.tsx`
    - 유틸리티/헬퍼 파일: `camelCase` → `form.util.ts`
- **파일 규칙**TypeScriptJavaScript
    - 하나의 컴포넌트 = 하나의 파일
    
    # 
    
    `// ✅ 좋은 예
    export default function UserCard() {
      return <div>...</div>;
    }
    // export default UserCard; (위와 동일)
    
    // ❌ 나쁜 예
    export function UserCard() { ... }
    export function UserProfile() { ... }`
    
    - 파일 이름 = 내보내는 주요 컴포넌트와 일치
    
    # 
    
    `// Button.jsx
    export default function Button() { ... }`
    

### 1.6. 폴더 구조

- **폴더명 케이스**: `kebab-case`
    - 예시: `user-profiles`, `auth-context`

### 1.7. TypeScript 관련 컨벤션

- `Type`과 `Interface` 중 **타입 별칭 (`type alias`)만 사용**
- 타입 이름은 `T` 접두사와 `PascalCase` 조합 (예: `TUserProfile`, `TPostProps`)
- 프롭스(`Props`)는 항상 명시적으로 타입 지정
- 화살표 함수로 작성하고, 각 함수마다 `export`로 작성 (`export default` 제외)
- **타입 컨벤션 (중요)**: 모든 프론트엔드 타입은 `src/types` 디렉토리 안에서 통합 관리
    - **규칙**
        - 타입 파일 이름: `[컴포넌트이름].types.ts`
        - 타입 이름: `T[컴포넌트이름]Props`
    - **예시**TypeScript
        
        # 
        
        `// 📁 src/types/TextArea.types.ts
        export type TTextAreaProps = {
          placeholder?: string;
          value?: string;
          onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
        };
        
        // 📁 src/components/TextArea/index.tsx
        import { TTextAreaProps } from "@/types/TextArea.types";
        
        const TextArea = ({ placeholder, value, onChange }: TTextAreaProps) => {
          return (
            <textarea
              placeholder={placeholder || "메시지를 입력해주세요"}
              value={value}
              onChange={onChange}
              className="w-[570px] h-40 p-6 bg-white rounded-sm border border-neutral-300 text-base text-neutral-800 resize-none focus:outline focus:outline-2 focus:outline-blue-400 placeholder:text-neutral-400"
            />
          );
        };
        
        export default TextArea;`
        

### 1.8. 공용 컴포넌트 개발 관련 규칙

- **`clsx` 라이브러리 활용** (조건부 CSS 클래스 관리를 위해)
- **아이콘 파일 (`src/svg`)**
    - 색상을 프롭스로 받아야 하는 경우, 새로운 컴포넌트를 생성하여 활용.
    - `fill` 속성에 색상만 넣어주면 됨 (동일한 모양의 아이콘을 다른 색상으로 보여줄 때 유용)
    - **예시**TypeScript
        
        # 
        
        `import React from "react";
        
        export default function CartSvg({ fill }: { fill: string }) {
          return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
              <path
                d="..." // 생략된 path 데이터
                stroke="black"
                strokeWidth="1.5"
              />
            </svg>
          );
        }`
        

---

## 2. 백엔드

### 2.1. Prisma ORM 네이밍 컨벤션

- **모델**: 파스칼 케이스 (`PascalCase`)로 된 단수 명사
    - 예시: `User`, `Post`, `Comment`
- **필드**: 카멜 케이스 (`camelCase`)
    - 예시: `firstName`, `createdAt`, `userId`
- **열거형 (Enum)**: 파스칼 케이스 (`PascalCase`)
    - 예시: `Role`, `PostStatus`
- **열거형 값**: 일반적으로 밑줄로 구분된 대문자 (`UPPER_SNAKE_CASE`)
    - 예시: `ADMIN`, `USER_BASIC`
- **관계**: 카멜 케이스, 종종 관련 모델을 반영
    - 예시: `User` 모델의 게시물을 위한 `posts` 필드

### 2.2. 디렉토리별 파일명 규칙

- `middlewares`: `[기능].middleware.ts` (예: `errorHandler.middleware.ts`)
- `routes`: `[기능].route.ts` (예: `auth.route.ts`)
- `controllers`: `[기능].controller.ts` (예: `auth.controller.ts`)
- `services`: `[기능].service.ts` (예: `auth.service.ts`)
- `repositories`: `[기능].repository.ts` (예: `auth.repository.ts`)
- 이름이 길어지는 경우 (예: `errorHandler`)에도 카멜 케이스 유지

### 2.3. 에러 핸들러 유형, 타입, 처리

- **에러 핸들러 정의**TypeScript
    
    # 
    
    `import { ErrorRequestHandler } from "express";
    
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
    
    export default errorHandler;`
    
- **에러 타입 정의**TypeScript
    
    # 
    
    `export class AppError extends Error {
      code?: number;
      data?: any;
    
      constructor(message: string, code?: number, data?: any) {
        super(message);
        this.code = code;
        this.data = data;
        this.name = "AppError";
      }
    }
    
    // 자주 사용하는 에러들을 위한 편의 클래스들
    export class BadRequestError extends AppError {
      constructor(message: string, data?: any) {
        super(message, 400, data);
        this.name = "BadRequestError";
      }
    }
    
    export class AuthenticationError extends AppError {
      constructor(message: string, data?: any) {
        super(message, 401, data);
        this.name = "AuthenticationError";
      }
    }
    
    export class ForbiddenError extends AppError {
      constructor(message: string, data?: any) {
        super(message, 403, data);
        this.name = "ForbiddenError";
      }
    }
    
    export class NotFoundError extends AppError {
      constructor(message: string, data?: any) {
        super(message, 404, data);
        this.name = "NotFoundError";
      }
    }
    
    export class ValidationError extends AppError {
      constructor(message: string, data?: any) {
        super(message, 422, data);
        this.name = "ValidationError";
      }
    }
    
    export class ServerError extends AppError {
      constructor(message: string, data?: any) {
        super(message, 500, data);
        this.name = "ServerError";
      }
    }`
    
- **에러 처리 예시**TypeScript
    
    # 
    
    `if (!order) {
      throw new NotFoundError("해당 주문 내역을 찾을 수 없습니다.");
    }`
    

### 2.4. 함수 생성, import, export 컨벤션

- **함수 정의 스타일**
    - `controller`: 화살표 함수
    - `service`, `repository`: 화살표 함수
    - `middleware`: 화살표 함수
- **Import / Export 방법**
    - 함수는 화살표 함수로 작성하고, 각 함수마다 `export`를 붙이지 않고 파일 마지막에서 `export default`로 한꺼번에 내보내기
    - **예시**:
        - `services/auth.service.js`JavaScript
            
            # 
            
            `// src/services/auth.service.js
            import bcrypt from 'bcrypt';
            
            const login = async (email, password) => {
              // ...
            };
            
            const register = async (email, password) => {
              // ...
            };
            
            export default {
              login,
              register,
            };`
            
        - `controllers/auth.controller.js`JavaScript
            
            # 
            
            `// src/controllers/auth.controller.js
            import authService from '../services/auth.service.js';
            import { RequestHandler } from 'express'; // RequestHandler 임포트
            
            export const loginController: RequestHandler = async (req, res, next) => { // RequestHandler 타입 명시
              try {
                const { email, password } = req.body;
                const result = await authService.login(email, password);
                res.status(200).json(result);
              } catch (err) {
                next(err); // 에러 핸들링 미들웨어로 전달
              }
            };
            
            export const registerController: RequestHandler = async (req, res, next) => { // RequestHandler 타입 명시
              try {
                const { email, password } = req.body;
                const result = await authService.register(email, password);
                res.status(201).json(result);
              } catch (err) {
                next(err); // 에러 핸들링 미들웨어로 전달
              }
            };`
            
- **파일 구조**
    
    `src/
    ├── controllers/
    │   └── auth.controller.js
    ├── services/
    │   └── auth.service.js
    ├── routes/
    │   └── auth.route.js
    ├── utils/
    │   └── jwt.js
    └── app.js`
    

### 2.5. Repository에서 `$transaction` 처리 컨벤션

- **레포지토리 레벨에서 설계법 (분기처리)**TypeScript
    
    # 
    
    `import { Prisma } from '@prisma/client'; // Prisma 타입 임포트
    
    const createProduct = async (foo: any, tx?: Prisma.TransactionClient) => {
      const client = tx || prisma; // prisma 인스턴스는 전역적으로 선언되어 있다고 가정
    
      return await client.order.findMany();
    };
    
    export default { createProduct }`
    
- **Service 레벨에서 사용 예시**TypeScript
    
    # 
    
    `import productRepository from './path' // 실제 경로로 변경
    import { prisma } from '../utils/prisma'; // prisma 인스턴스 임포트 (예시)
    
    const createProduct = async (input: any) => {
      return await prisma.$transaction(async (tx) => { // async 함수로 변경
        await productRepository.createProduct(input, tx)
      });
    };
    
    export default { createProduct }; // 서비스 함수도 export default로 한꺼번에 내보내기`
    

### 2.6. DTO 사용하는 방법

- DTO의 목적: 유저에게서 받아오는 값의 형(type)을 명시
- `src/dtos` 디렉토리에서 관리
- `export type`으로 정의
- 네이밍: `T` 접두사 + `[이름]Dto` 형식 (예: `TCreateProductDto`)
- **DTO 예시**TypeScript
    
    # 
    
    `// dtos/create-product.dto.ts
    export type TCreateProductDto = {
      name: string;
      price: number;
    };`
    

### 2.7. Controller 작성 시 규칙

1. **형 변환이 필요한 경우: `parseNumberOrThrow` 사용**
    - **사용 이유**: 프론트에서 전달된 값이 문자열일 수 있으므로, 숫자로 안전하게 변환하고 에러 처리를 위해 예외를 던지는 함수. 타입 안정성과 예측 가능한 에러 처리를 위해 반드시 사용.
    - **위치**: `src/utils/parseNumberOrThrow.ts`
    - **`parseNumberOrThrow.ts` 예시**:TypeScript
        
        # 
        
        `// utils/parseNumberOrThrow.ts
        export function parseNumberOrThrow(value: string | undefined, fieldName: string): number {
          const parsed = Number(value);
          if (isNaN(parsed)) {
            throw new Error(`${fieldName} must be a number`);
          }
          return parsed;
        }`
        
    - **컨트롤러 사용 예시**:TypeScript
        
        # 
        
        `import { parseNumberOrThrow } from '@/utils/parseNumberOrThrow';
        
        const productId = parseNumberOrThrow(req.params.id, 'productId');`
        
2. **유저 인풋 타입 명시: DTO로 분리**
    - **사용 이유**: 컨트롤러의 책임을 명확히 분리하고, 요청 데이터 구조를 명확히 하기 위함. 모든 유저 입력 값은 DTO 파일에서 타입을 정의.
    - **위치 예시**: `src/dtos/product.dto.ts`
    - **타입 정의 & 네이밍 룰**: `type`으로 정의 (`interface` 말고) & `T` 접두사 + `[이름]Dto`
    - **컨트롤러 사용 예시**:TypeScript
        
        # 
        
        `import { TCreateProductDto } from '@/dtos/create-product.dto'; // T 접두사 사용
        
        const { name, price }: TCreateProductDto = req.body;`
        
3. **`RequestHandler`로 `req`, `res`, `next` 타입 명시 (화살표 함수 버전)**
    - **사용 이유**: Express 기본 객체들의 타입을 명확하게 지정하고, 팀 컨벤션인 화살표 함수 형태로 일관성 있게 작성하기 위함.
    - **기본 사용 예시 (화살표 함수)**:TypeScript
        
        # 
        
        `import { RequestHandler } from 'express';
        
        export const createProductController: RequestHandler = async (req, res, next) => {
          try {
            // 컨트롤러 로직
            res.status(201).json({ message: 'Product created' });
          } catch (err) {
            next(err);
          }
        };`
        

---

## 3. 협업

### 3.1. 프론트엔드

- **반응형**: 모바일 퍼스트(`Mobile-First`)로 시작하여 Tablet, PC까지 모든 해상도 구현 후 다음 페이지 작업
- **CSS**: Tailwind CSS 사용
- **컴포넌트**: 각 페이지 폴더마다 `_components` 디렉토리로 관리
- **컴포넌트 파일**: 하나의 컴포넌트 파일 안에는 하나의 컴포넌트만 존재
- **페이지 컴포넌트**: 반드시 `...Page` 접미사 사용

### 3.2. 백엔드

- **API 명세 관련 `response` 컨벤션**
    - `DELETE` 관련 요청 처리 후, **상태 코드 200과 응답 본문을 반드시 제공**
    - **예시**:JSON
        - `DELETE /companies/123`
        - **HTTP/1.1 200 OK**
        - **Content-Type: application/json**
        
        # 
        
        `{
          "message": "[xx]가 성공적으로 처리 되었습니다"
        }`
        

### 3.3. PR (Pull Request)

- **전체적인 규칙**
    - **Merge 전략**: Git Flow_Merge
    - **PR 주기**: 하루에 한 번, **오후 1시**에 PR 리뷰 & 머지 시간 가짐. (급한 경우 유연하게 1시 이후에도 PR 요청 가능)
- **PR 작성 시 / 작성 후 유의사항**
    - **PR 제목**: `commit message`와 동일하거나, 커밋이 여러 개인 경우 `commit title: 내용` 형식으로 작성하고, 마지막에 항상 `[자기이름]`을 붙이기
    - **Label**: Issue와 연관된 Label 선택
    - **Assignee**: 본인 지정
    - **Reviewer**: 미리 정해진 코딩 페어 파트너 1명 지정
        - (김홍섭-이지수, 이태빈-장원빈, 김우주-조성빈)
    - **리뷰어로서 PR 리뷰 후**: 리뷰해준 사람의 브랜치 삭제 후, 3팀 디스코드 PR 채널에 머지 완료되었다고 댓글로 알려주기
    - **PR 보내고 나서 할 일**: 3팀 디스코드 PR 채널에 리뷰어 `@` 태그하여 PR 리뷰 요청 메시지 보내기
- **(PR 리뷰어로 다른 팀원에게서 요청 왔을 때)**
    - 요청 온 메시지에 **리뷰 중임을 의미하는 ✅ 체크 이모지로 리액션** 남기기
    - **리뷰할 때**: `Files changed` 탭에 들어가서 코멘트를 다는 것이 좋음
    - **승인 바로 하는 기준**: 팀원이 고칠 내용이 없고, 리뷰 내용으로 개선점/제안 등을 한 경우에는 승인하고 팀원에게 리뷰 끝났다고 알려주기
    - **승인을 바로 하지 않는 기준**: 팀 컨벤션에 어긋나는 경우, 코멘트를 달아서 팀원에게 안내하고 팀원이 맞게 수정한 경우에만 승인
    - **리뷰 끝나고 머지 후 브랜치는 꼭 삭제**

---

## 4. 기타

### 4.1. `.prettierrc` 설정

JSON

# 

`{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": false,
  "bracketSpacing": true,
  "trailingComma": "all"
}`

- **Prettier 설정 항목 설명**
    - `"printWidth": 120`: 한 줄에 최대 120자까지 허용하며, 그 이상 길어지면 자동으로 줄바꿈
    - `"tabWidth": 2`: 들여쓰기할 때 한 탭을 2칸으로 설정 (공백 2칸)
    - `"useTabs": false`: 들여쓸 때 탭 문자가 아니라 공백을 사용
    - `"semi": true`: 문장 끝에 항상 세미콜론(;)을 붙임
    - `"singleQuote": false`: 문자열을 `"` (큰따옴표)로 감쌈 (예: `"hello"`)
    - `"bracketSpacing": true`: 객체 리터럴에서 중괄호 안쪽에 공백을 추가 (예: `{ foo: bar }`)
    - `"trailingComma": "all"`: 가능한 모든 위치에 쉼표를 붙임 (예: `[1, 2, 3,]`, 함수 인자: `function test(a, b,) {}`)

### 4.2. Branch 네이밍

- `feat/landing`
- `feat/auth`
- `feat/modal`
- `feat/product`
- `feat/invite`
- `feat/cart-[세부기능]`

### 4.3. Next.js 팩

- Turbo pack 사용

### 4.4. Import 경로

- 멀리 있는 것은 **절대 경로**, 가까이 있는 것은 **상대 경로** 사용
- 현재 시점 기준으로 멀다면 무조건 절대 경로 적용

---