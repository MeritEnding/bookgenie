import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [modal, openModal] = useState(false);
  const targetIdRef = useRef(null);

  const editClick = (id) => {
    navigate(`/Update/${id}`);
  };

  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/books");
      setBooks(response.data);
    } catch (error) {
      console.error("도서 정보를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async () => {
    const id = targetIdRef.current;
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      setBooks((prev) => prev.filter((book) => book.id !== id));
      openModal(false);
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className="App">
      {books.map((item) => (
        <div
          className="book-card"
          key={item.id}
          onClick={() => handleCardClick(item.id)}
          style={{ cursor: "pointer" }}
        >
          <div className="cover-box">
            {/* 임시 이미지 박스 */}
            <div style={{ width: "100px", height: "140px", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span>이미지 없음</span>
            </div>
          </div>
          <div className="book-info">
            <h3>{item.title}</h3>
            <p>저자: {item.author || "미상"}</p>
            <p>출판사: {item.publisher || "미상"}</p>
            <p>출판일: {item.publishedDate}</p>
            <p>가격: {item.price?.toLocaleString()}원</p>
          </div>
          <div className="action-buttons">
            <button
              onClick={(e) => {
                e.stopPropagation();
                targetIdRef.current = item.id;
                openModal(true);
              }}
            >
              삭제
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                editClick(item.id);
              }}
            >
              수정
            </button>
          </div>
        </div>
      ))}

      <div className="register-area">
        <input type="text" placeholder="도서명 입력" />
        <button onClick={() => navigate("/Register")}>신규 도서 등록</button>
      </div>

      {modal && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p>정말 삭제하시겠습니까?</p>
            <button onClick={handleDelete} style={{ marginRight: "1rem" }}>확인</button>
            <button onClick={() => openModal(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
