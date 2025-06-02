import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  // 도서 정보 불러오기
  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error("도서 상세 정보를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  if (!book) {
    return <div>도서 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="app-container">
      <div className="header">
        <span>도서 상세 정보</span>
        <input type="text" value={book.title} readOnly />
      </div>

      <div className="card">
        {/* 이미지 부분 원래대로 유지 */}
        <img src={book.image} alt={book.title} className="book-image" />

        <div className="book-info">
          <div>
            <label>제목: </label>
            <input type="text" value={book.title} readOnly className="book-title" />
          </div>
          <div>
            <label>작가 ID: </label>
            <input type="text" value={book.authorId} readOnly className="book-author" />
          </div>
          <div>
            <label>출판사: </label>
            <input type="text" value={book.publisher} readOnly />
          </div>
          <div>
            <label>출판일: </label>
            <input type="text" value={book.publishedDate} readOnly />
          </div>
          <div>
            <label>가격: </label>
            <input type="text" value={book.price} readOnly />
          </div>
          <button className="confirm-btn" onClick={() => navigate("/")}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
