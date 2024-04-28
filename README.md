# CS-465 Portfolio
---
## Project Reflection
---
### Architecture

**Frontend Development Comparison**

In our full-stack project, we employed various frontend development approaches, including Express, HTML, JavaScript, and Single-Page Application (SPA) architecture. The Express, HTML, and JavaScript portion of the site were responsible for rendering pages. Utilizing Express alongside JavaScript, we created routes and controllers to handle browser requests for page content. Express would then retrieve static HTML pages or generate requested pages using Handlebars templates, populated with data fetched from the database. These tools worked harmoniously to manage server requests and deliver results to the frontend client. Conversely, the Angular portion of our project functioned differently. Upon the initial page load, the entire SPA was sent to the client, enabling all page rendering and code execution to occur client-side in the browser. Backend calls were only necessary for data retrieval from the database. While Express involved multiple server calls each time a page was loaded or refreshed, SPAs experienced a longer initial load time to fetch all code from the backend. However, subsequent navigation within the SPA required no additional server calls.

**Why NoSQL MongoDB Backend**

We opted for a NoSQL MongoDB database for our backend due to its scalability and quick querying capabilities. MongoDB's document-based structure aligns seamlessly with JSON formatting, making it an ideal match for frontend applications.

### **Functionality**

JSON (JavaScript Object Notation) serves as a specification for data formatting and can be utilized with various programming languages. In contrast, JavaScript is a programming language that utilizes JSON to define objects. The frontend and backend components of our application are interconnected through the utilization of APIs and JSON. RESTful APIs utilize JSON to handle requests and responses, facilitating seamless communication between frontend and backend.

**Refactoring for Improved Functionality**

Throughout our full-stack development process, we engaged in refactoring to enhance functionality and efficiency. For instance, we replaced some static HTML pages with Handlebars templates, enabling the reuse of page structures while allowing for dynamic content display. Additionally, we refactored by migrating content utilized for template population from static JSON files within the codebase to MongoDB. This approach enables easier content management without necessitating code deployments.


### **Testing and Security**

In a full-stack application, various methods for request and retrieval require diverse API testing approaches for endpoints, compounded by the challenges of testing with added security layers. HTTP methods, such as GET, POST, PUT, and DELETE, facilitate client-server interactions, with API endpoints serving as the means through which clients communicate with the server using these methods. Security measures in our full-stack application included user authentication and the issuance of valid JWTs (JSON Web Tokens) to grant access to specific endpoints.

### **Reflection**

This course has significantly contributed to my proficiency in full-stack web development, encompassing various aspects such as frontend frameworks/libraries like Angular, backend technologies including Express.js, and database management using MongoDB. Throughout the course, I've acquired essential skills in designing and implementing RESTful APIs, implementing user authentication and authorization systems, data modeling, and adept debugging and troubleshooting techniques. These skills collectively enhance my marketability in the software development field, as employers increasingly value developers with expertise in both frontend and backend technologies, along with hands-on experience with modern web development frameworks and tools.
