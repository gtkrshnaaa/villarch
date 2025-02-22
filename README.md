# **Villarch**
**Villarch** is a minimalist serverless API architecture built with **vanilla Node.js**. Designed for clarity, efficiency, and flexibility, Villarch helps developers create modular backend services focused on a well-structured **CRUD** pattern. Free from heavy frameworks, it’s perfect for projects that prioritize stability, scalability, and simplicity.  

**Villarch Philosophy:**  

*"Elegant in simplicity, powerful in efficiency, free from unnecessary complexity."*  

---

### 🏗️ **Architecture Structure (Folder Tree) with CRUD Focus:**  
```
/villarch
│
├── api/
│   ├── auth/
│   │   ├── login.js
│   │   └── register.js
│   ├── user/
│   │   ├── create.js
│   │   ├── read.js
│   │   ├── update.js
│   │   └── delete.js
│   ├── product/
│   │   ├── create.js
│   │   ├── read.js
│   │   ├── update.js
│   │   └── delete.js
│   ├── order/
│   │   ├── create.js
│   │   ├── read.js
│   │   ├── update.js
│   │   └── delete.js
│
├── utils/
│   ├── validate.js
│   └── response.js
│
├── config/
│   └── env.js
│
├── tests/
│   ├── auth.test.js
│   ├── user.test.js
│   └── product.test.js
│
├── core/
│   └── serverlessHandler.js
│
├── server.js
├── package.json
├── vercel.json
└── README.md
```

---

### 📖 **Structure Explanation:**  

1. **`/api/`**  
   - Organized by **main resources** (`user`, `product`, `order`), with separate CRUD operation files for each resource.  
   - The **`auth`** module handles login and registration functionalities.  

2. **`/utils/`**  
   - Contains helper functions like data validation and standardized JSON response formatting.  

3. **`/config/`**  
   - Stores global configurations, such as environment variables (`API_URL`, `DB_CONN`).  

4. **`/tests/`**  
   - Contains testing scripts to ensure each endpoint functions correctly.  

5. **`/core/`**  
   - Manages serverless behavior independently of platforms like Vercel.  

6. **`server.js`**  
   - Used when running the API on a VPS with a Node.js runtime.  

7. **`vercel.json`**  
   - Handles deployment configuration for Vercel.  

---

### ⚙️ **Basic CRUD Endpoint Example (`user/create.js`):**  
```js
// api/user/create.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({ error: 'Name and email are required' });
    return;
  }

  // Simulate user creation process
  res.status(201).json({ message: 'User created successfully', user: { id: Date.now(), name, email } });
}
```

---

