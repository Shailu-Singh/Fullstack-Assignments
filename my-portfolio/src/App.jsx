
import React from "react";
import "./App.css";

function App() {
  const projects = [
    {
      title: "E-Commerce Website",
      description: "Online shopping website using React.",
      tech: "React, CSS, Node.js"
    },
    {
      title: "Weather App",
      description: "Weather information using API.",
      tech: "JavaScript, API"
    },
    {
      title: "Portfolio Website",
      description: "My personal developer portfolio.",
      tech: "React, CSS"
    }
  ];

  return (
    <div>
      <nav className="navbar">
        <h2>Portfolio.</h2>
        <div>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero">
        <p className="tag">WELCOME TO MY PORTFOLIO</p>
        <h1>Hi, I'm <span>Shailendra</span></h1>
        <h2>React Developer & MCA Student</h2>
        <p>
          I love building websites and exploring new technologies.
          Currently learning Full Stack Development and AI/ML.
        </p>
        <a href="#projects" className="btn">Explore My Work</a>
      </section>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I am an MCA student specializing in AI/ML.
          I enjoy programming, problem solving and developing
          creative web applications.
        </p>
      </section>

      <section id="skills" className="section">
        <h2>My Skills</h2>
        <div className="skills">
          {["HTML", "CSS", "JavaScript", "React",
            "Python", "Node.js", "MongoDB"].map(skill => (
              <div className="skill" key={skill}>{skill}</div>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <h2>My Projects</h2>
        <div className="project-container">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <small>{project.tech}</small>
              <button>View Project</button>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          alert("Message submitted!");
        }}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required />
          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer>
        <p>© 2026 Shailendra | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
