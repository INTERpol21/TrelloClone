import React, { useState } from "react";
import { AlignLeft, CheckSquare, Clock, MessageCircle, MoreHorizontal } from "react-feather";
import { formatDate } from "../../Helper/Util";
import { ICard } from "../../Interfaces/Kanban";
import Chip from "../Common/Chip";
import Dropdown from "../Dropdown/Dropdown";

import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";
interface CardProps {
  card: ICard;
  boardId: number;
  removeCard: (boardId: number, cardId: number) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
  user:string
  inputText:string
}

//Карточка без popup
function Card(props: CardProps) {
  const { card, boardId, removeCard, onDragEnd, onDragEnter, updateCard,user,inputText} =
    props;
  const { id, title, desc, date, tasks, labels,messages} = card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);



  return (
    <>
      {showModal && (
        <CardInfo
          inputText={inputText}
          user={user}
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
        />
      )}
      <div
        className="card"
        key={card.id}
        draggable
        onDragEnd={() => onDragEnd(boardId, id)}
        onDragEnter={() => onDragEnter(boardId, id)}
        onClick={() => setShowModal(true)}
      >
        <div className="card-top">
          <div className="card-top-labels">
            {labels?.map((item, index) => (
              <Chip key={index} item={item} />
            ))}
          </div>
          <div
            className="card-top-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => removeCard(boardId, id)}>Delete Card</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card-title">{title}</div>
        <div className="card-item">
          <p title={desc}>
            <AlignLeft />
          </p>

          {messages && messages.length > 0 && (
            <p >
              <MessageCircle  />
              {messages?.filter((item) => item).length}
            </p>
          )}
        </div>

        <div className="card-footer">
          {date && (
            <p className="card-footer-item">
              <Clock className="card-footer-icon" />
              {formatDate(date)}
            </p>
          )}
          {tasks && tasks?.length > 0 && (
            <p className="card-footer-item">
              <CheckSquare className="card-footer-icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
