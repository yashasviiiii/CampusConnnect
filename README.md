# CampusConnect

CampusConnect is a full-stack web platform designed to connect college communities. It enables students to interact, collaborate, and stay informed through features like real-time messaging, an anonymous discussion forum (*Heard in Campus*), a student-run buy/sell marketplace, and college event postings — all within a secure, college-verified ecosystem.


## 🚀 Features

- 🎭 **Heard in Campus** – Post and browse anonymous thoughts or confessions within your campus.
- 🛒 **Marketplace** – Buy and sell books, electronics, and more with verified college users.
- 💬 **Real-Time Messaging** – One-on-one chat with students using a live messaging system.
- 🎉 **Events Board** – Discover or promote college fests, workshops, and campus events.
- 🧑‍🎓 **Verified Access** – Only students with valid college IDs can sign up and access features.

---

## 🛠 Tech Stack

### 💻 Frontend
- **React**
- **TypeScript**
- **Tailwind CSS**

### 🔧 Backend / Database
- **Supabase** (Authentication + PostgreSQL)
- **SQL** for schema design and queries

### 🔄 Realtime
- **Supabase Realtime** for live chat, likes, comments

---

## 🧠 Core Modules & Functionality

| Module              | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
|  Discussion Forum  | Includes both anonymous and identified posts, with likes & comments         |
|  Marketplace       | Users can list products with condition tags and images                     |
|  Messaging         | Real-time chat using Supabase channels                                     |
|  Heard in Campus   | Anonymous microblogging for campus buzz                                    |
|  Events            | Event posting board filtered by dates and categories                       |

---

## 🔐 Authentication & Access

- College email verification ensures trusted and secure user base.
- User data is managed through Supabase `profiles` and related tables.



## 🧪 Future Enhancements

- ✅ Group chats & community channels  
- ✅ Image upload for profiles & events  
- ✅ Admin/moderator panel for post approval  

---



