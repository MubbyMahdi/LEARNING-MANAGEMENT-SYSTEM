
import React, { useState } from "react";
import "./index.css";

const initialCourses = [
  {
    id: 1,
    title: "React for Beginners",
    category: "Development",
    instructor: "Alex Morgan",
    description:
      "Learn React fundamentals, components, props, state, and how to build interactive web applications.",
    color: "#e8e7ff",
    icon: "⚛️",
    lessons: [
      {
        id: 101,
        title: "Introduction to React",
        duration: "8 min",
        content:
          "React is a JavaScript library for building user interfaces. It lets you create reusable components that update when your data changes.",
      },
      {
        id: 102,
        title: "Understanding Components",
        duration: "12 min",
        content:
          "Components are reusable pieces of your interface. A component can contain HTML-like JSX, JavaScript logic, and other components.",
      },
      {
        id: 103,
        title: "Props and Data",
        duration: "15 min",
        content:
          "Props allow a parent component to pass information to a child component. They help you reuse components with different data.",
      },
      {
        id: 104,
        title: "State with useState",
        duration: "18 min",
        content:
          "The useState hook lets a component remember information, such as a selected course or whether a lesson is complete.",
      },
    ],
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    instructor: "Sarah James",
    description:
      "Explore visual design, user experience, layouts, colors, and accessible interfaces.",
    color: "#ffe9d8",
    icon: "🎨",
    lessons: [
      {
        id: 201,
        title: "What is UI/UX?",
        duration: "10 min",
        content:
          "UI focuses on the interface people see and interact with. UX focuses on the overall experience of using a product.",
      },
      {
        id: 202,
        title: "Color and Typography",
        duration: "14 min",
        content:
          "Learn how color, font choice, contrast, and spacing help make interfaces clear and readable.",
      },
      {
        id: 203,
        title: "Designing User Flows",
        duration: "16 min",
        content:
          "A user flow describes the steps someone takes to complete a task in your application.",
      },
    ],
  },
  {
    id: 3,
    title: "JavaScript Mastery",
    category: "Development",
    instructor: "David Smith",
    description:
      "Strengthen your JavaScript skills through variables, functions, arrays, objects, and practical examples.",
    color: "#fff2bf",
    icon: "💻",
    lessons: [
      {
        id: 301,
        title: "JavaScript Fundamentals",
        duration: "12 min",
        content:
          "JavaScript adds logic and interactivity to websites. Start with variables, data types, operators, and expressions.",
      },
      {
        id: 302,
        title: "Functions and Arrays",
        duration: "18 min",
        content:
          "Functions package reusable logic. Arrays store ordered collections of values that you can iterate over and transform.",
      },
    ],
  },
  {
    id: 4,
    title: "Data Analysis Basics",
    category: "Data",
    instructor: "Grace Lee",
    description:
      "Discover how to organize, examine, and interpret data to answer useful questions.",
    color: "#d9f7e9",
    icon: "📊",
    lessons: [
      {
        id: 401,
        title: "Introduction to Data",
        duration: "9 min",
        content:
          "Data analysis begins by asking a question, collecting relevant information, and checking its quality.",
      },
      {
        id: 402,
        title: "Understanding Charts",
        duration: "13 min",
        content:
          "Bar charts compare categories, line charts show changes over time, and scatter plots help reveal relationships.",
      },
    ],
  },
];

export default function App() {
  const [courses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All Courses");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  function openCourse(course) {
    setSelectedCourse(course);
    setSelectedLesson(null);
  }

  function goBack() {
    if (selectedLesson) {
      setSelectedLesson(null);
    } else {
      setSelectedCourse(null);
    }
  }

  function toggleCompleted(lessonId) {
    setCompletedLessons((previous) =>
      previous.includes(lessonId)
        ? previous.filter((id) => id !== lessonId)
        : [...previous, lessonId]
    );
  }

  const getProgress = (course) => {
    const completed = course.lessons.filter((lesson) =>
      completedLessons.includes(lesson.id)
    ).length;

    return Math.round((completed / course.lessons.length) * 100);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTab =
      activeTab === "All Courses" ||
      course.category === activeTab;

    return matchesSearch && matchesTab;
  });

  const completedCourses = courses.filter(
    (course) => getProgress(course) === 100
  ).length;

  const averageProgress = Math.round(
    courses.reduce((sum, course) => sum + getProgress(course), 0) /
      courses.length
  );

  // LESSON PAGE
  if (selectedCourse && selectedLesson) {
    const isCompleted = completedLessons.includes(selectedLesson.id);

    return (
      <div className="main learning-page">
        <button className="back-btn" onClick={goBack}>
          ← Back to course
        </button>

        <div className="lesson-layout">
          <article className="lesson-content">
            <span className="category">{selectedCourse.category}</span>
            <h1>{selectedLesson.title}</h1>
            <p className="instructor">
              {selectedCourse.title} · {selectedLesson.duration}
            </p>

            <div className="lesson-video">
              <span>📖</span>
              <p>Lesson content</p>
              <small>
                Your learning material will appear here.
              </small>
            </div>

            <h2>What you'll learn</h2>
            <p className="lesson-text">{selectedLesson.content}</p>

            <button
              className="primary-btn"
              onClick={() => toggleCompleted(selectedLesson.id)}
            >
              {isCompleted
                ? "✓ Completed — Mark as incomplete"
                : "✓ Mark lesson as completed"}
            </button>

            <p className="instructor">
              Course progress: {getProgress(selectedCourse)}%
            </p>
          </article>

          <aside className="lesson-sidebar">
            <h3>Course lessons</h3>

            {selectedCourse.lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                className={
                  selectedLesson.id === lesson.id
                    ? "lesson-item selected"
                    : "lesson-item"
                }
                onClick={() => setSelectedLesson(lesson)}
              >
                <span>
                  {completedLessons.includes(lesson.id) ? "✓" : index + 1}
                </span>
                <span>{lesson.title}</span>
              </button>
            ))}
          </aside>
        </div>
      </div>
    );
  }

  // COURSE DETAILS PAGE
  if (selectedCourse) {
    const progress = getProgress(selectedCourse);

    return (
      <div className="main">
        <button className="back-btn" onClick={goBack}>
          ← Back to courses
        </button>

        <section
          className="course-hero"
          style={{ backgroundColor: selectedCourse.color }}
        >
          <span className="hero-icon">{selectedCourse.icon}</span>
          <span className="category">{selectedCourse.category}</span>
          <h1>{selectedCourse.title}</h1>
          <p>Instructor: {selectedCourse.instructor}</p>
        </section>

        <div className="details-layout">
          <article className="details-main">
            <h2>About this course</h2>
            <p>{selectedCourse.description}</p>

            <h2>Course curriculum</h2>
            <p>{selectedCourse.lessons.length} lessons</p>

            <div className="curriculum">
              {selectedCourse.lessons.map((lesson, index) => (
                <button
                  className="curriculum-item"
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <span className="lesson-number">
                    {completedLessons.includes(lesson.id)
                      ? "✓"
                      : index + 1}
                  </span>
                  <span className="curriculum-title">
                    <strong>{lesson.title}</strong>
                    <small>{lesson.duration}</small>
                  </span>
                  <span>→</span>
                </button>
              ))}
            </div>
          </article>

          <aside className="details-card">
            <div className="details-icon">{selectedCourse.icon}</div>
            <h3>Your learning progress</h3>
            <h2>{progress}%</h2>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p>
              {selectedCourse.lessons.filter((lesson) =>
                completedLessons.includes(lesson.id)
              ).length}{" "}
              of {selectedCourse.lessons.length} lessons completed
            </p>
            <button
              className="primary-btn"
              onClick={() => setSelectedLesson(selectedCourse.lessons[0])}
            >
              {progress === 100 ? "Review course" : progress > 0 ? "Continue learning" : "Start learning"}
            </button>
          </aside>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">
          LearnHub<span>.</span>
        </h2>
        <p className="menu-label">MENU</p>

        {["Dashboard", "All Courses", "My Learning", "Certificates"].map(
          (item) => (
            <button
              key={item}
              className={
                activeTab === item ? "nav-item active" : "nav-item"
              }
              onClick={() =>
                setActiveTab(
                  item === "Dashboard" || item === "My Learning" ||
                    item === "Certificates"
                    ? "All Courses"
                    : item
                )
              }
            >
              {item === "Dashboard" ? "⌂" : "▣"} {item}
            </button>
          )
        )}

        <div className="sidebar-bottom">
          <div className="avatar">S</div>
          <div>
            <strong>Student User</strong>
            <p>My account</p>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR LEARNING SPACE</p>
            <h1>Dashboard</h1>
          </div>
          <div className="avatar">S</div>
        </header>

        <section className="welcome">
          <div>
            <p>WELCOME BACK 👋</p>
            <h2>Keep learning, keep growing.</h2>
            <span>Your next big skill starts here.</span>
          </div>
          <div className="welcome-icon">📚</div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Enrolled courses</span>
            <h2>{courses.length}</h2>
          </div>
          <div className="stat-card">
            <span>Completed courses</span>
            <h2>{completedCourses}</h2>
          </div>
          <div className="stat-card">
            <span>Average progress</span>
            <h2>{averageProgress}%</h2>
          </div>
        </section>

        <section className="courses-section">
          <div className="section-heading">
            <div>
              <h2>Explore your courses</h2>
              <p>Build skills one lesson at a time.</p>
            </div>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses..."
            />
          </div>

          <div className="filters">
            {["All Courses", "Development", "Design", "Data"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={
                    activeTab === tab ? "filter active" : "filter"
                  }
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <div className="course-grid">
            {filteredCourses.map((course) => (
              <article className="course-card" key={course.id}>
                <div
                  className="course-art"
                  style={{ backgroundColor: course.color }}
                >
                  <span>{course.icon}</span>
                </div>

                <div className="course-body">
                  <span className="category">{course.category}</span>
                  <h3>{course.title}</h3>
                  <p className="instructor">
                    Instructor: {course.instructor}
                  </p>

                  <div className="progress-label">
                    <span>Progress</span>
                    <strong>{getProgress(course)}%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${getProgress(course)}%` }}
                    />
                  </div>

                  <button
                    className="continue-btn"
                    onClick={() => openCourse(course)}
                  >
                    View course →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <p>No courses found. Try another search.</p>
          )}
        </section>
      </main>
    </div>
  );
}
