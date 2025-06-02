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

  // Function to generate image for a book
  const generateBookImage = async (bookTitle, bookId) => {
    try {
      const prompt = `Cover art for a book titled "${bookTitle}" in a unique and captivating style.`;
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          n: 1,
          size: "512x512",
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API 호출 실패:", errorText);
        // Optionally, alert the user or show a fallback message
        return null;
      }

      const data = await res.json();
      console.log("API 응답:", data);

      if (data?.data?.length > 0) {
        const imageUrl = data.data[0].url;
        // Update the specific book's imageUrl in the state
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId ? { ...book, imageUrl: imageUrl } : book
          )
        );
        return imageUrl;
      } else {
        console.warn("이미지를 가져오지 못했습니다.");
        return null;
      }
    } catch (error) {
      console.error("이미지 생성 중 오류 발생:", error);
      return null;
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
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={`${item.title} 책 표지`}
                style={{ width: "100px", height: "140px", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100px",
                  height: "140px",
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column", // To stack text and button
                }}
              >
                
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    generateBookImage(item.title, item.id);
                  }}
                  style={{ marginTop: "10px", padding: "5px 10px", fontSize: "0.8em" }}
                >
                  이미지 생성
                </button>
              </div>
            )}
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
        <div className="modal-overlay">
          <div className="modal-content">
            <p>정말 삭제하시겠습니까?</p>
            <button onClick={handleDelete}>확인</button>
            <button onClick={() => openModal(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
