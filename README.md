# **Villarch**

**Villarch** is a minimalist serverless API architecture built with **vanilla Node.js**. Designed for clarity, efficiency, and flexibility, Villarch helps developers create modular backend services focused on a well-structured **CRUD** pattern. Free from heavy frameworks, it’s perfect for projects that prioritize stability, scalability, and simplicity.  

Villarch is also built to ensure a **seamless transition between serverless platforms like Vercel and traditional VPS environments**—allowing developers to scale and migrate effortlessly without rewriting code.  


**Villarch Philosophy:**  

> "*Effortless in simplicity, powerful in efficiency, seamless in flexibility.*"  

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
│   └── villarchRuntime.js #(serverlessHandler)
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

### 🔄 Seamless Transition: From Serverless to VPS

One of Villarch's core strengths is its **flexibility to run seamlessly across different environments**. Whether you're deploying on a *serverless* platform like **Vercel** or managing your own **VPS**, Villarch’s architecture ensures you **won’t need to rewrite your code**.

#### 🔍 **How Does It Work?**

Villarch is designed with a *serverless-first* mindset, meaning:  
- Each function is **stateless** and executed per request, just like traditional serverless environments.  
- Core logic remains consistent across deployments, allowing for easy migration from platforms like Vercel to a VPS.  
- The `server.js` file serves as the entry point for running Villarch on a VPS while preserving the same modular, stateless functions used in serverless environments.  

#### 🚀 **Why Is This Useful?**  

- ✅ **No Code Rewriting**: You can switch from serverless hosting to a VPS without changing the core logic.  
- ✅ **Cost-Effective Scaling**: Start with Vercel for development or low-traffic applications, then move to a VPS for more control and reduced hosting costs as your project grows.  
- ✅ **Consistent Architecture**: Maintain the same clean, modular, and stateless function design across different environments.  

#### 🔗 **How to Run Villarch on a VPS?**  

When moving to a VPS:  
1. Ensure that `server.js` is set up to listen on a specific port.  
2. Run your server with Node.js:  
   ```bash
   node server.js
   ```  
3. All existing API routes and logic will function exactly the same as they did in the serverless environment.  

---

