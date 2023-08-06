import "./index.css";
import { useState } from "react";

const initialSpeakers = [
  {
    id: 118836,
    name: "Mathilda",
    image: "https://i.pravatar.cc/48?u=118835",
    talkDescription: "How internet works",
    time: "08: 00AM - 09: 00AM",
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933376",
    talkDescription: "Advanced Patterns of React.js",
    time: "09: 00AM - 10: 00AM",
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499470",
    talkDescription: "Power of Networking",
    time: "10: 00AM - 11: 00AM",
  },
];

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [speakers, setSpeakers] = useState(initialSpeakers);
  const [showAddSpeaker, setShowAddSpeaker] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [userSpeakerList, setUserSpeakerList] = useState([]);

  function handleShowAddSpeaker() {
    setShowAddSpeaker((show) => !show);
    setSelectedSpeaker(null);
  }

  function AddSpeaker(speaker) {
    setSpeakers((speakers) => [...speakers, speaker]);
    setShowAddSpeaker(false);
  }

  function handleSelection(speaker) {
    setSelectedSpeaker((cur) => (cur?.id === speaker.id ? null : speaker));
    setShowAddSpeaker(false);
  }

  function handleSelectSpeaker(speaker) {
    setUserSpeakerList((userSpeakerList) => [...userSpeakerList, speaker]);
  }

  function handleDelete(id) {
    setUserSpeakerList((speakerlist) =>
      speakerlist.filter((speaker) => speaker.id !== id)
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <SpeakerList
          speakers={speakers}
          selectedSpeaker={selectedSpeaker}
          onSelection={handleSelection}
        />

        {
          <UserSpeakerList
            userSpeakerList={userSpeakerList}
            selectedSpeaker={selectedSpeaker}
            onDelete={handleDelete}
          />
        }

        {showAddSpeaker && <BecomeSpeaker onAddSpeaker={AddSpeaker} />}

        <Button onClick={handleShowAddSpeaker}>
          {showAddSpeaker ? "Close" : "Become a speaker 🎤"}
        </Button>
      </div>

      {selectedSpeaker && (
        <SpeakerInfo
          selectedSpeaker={selectedSpeaker}
          onSelectSpeaker={handleSelectSpeaker}
        />
      )}
    </div>
  );
}

function SpeakerList({ speakers, selectedSpeaker, onSelection }) {
  return (
    <ul>
      <h1>Conference Speaker List</h1>

      <h2>Our Speakers</h2>
      {speakers.map((speaker) => (
        <Speaker
          speaker={speaker}
          selectedSpeaker={selectedSpeaker}
          onSelection={onSelection}
          key={speaker.id}
        />
      ))}
    </ul>
  );
}

function Speaker({ speaker, selectedSpeaker, onSelection }) {
  const isSelected = selectedSpeaker?.id === speaker.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={speaker.image} alt={speaker.name} />
      <h3>{speaker.name}</h3>

      <p>{speaker.talkDescription}</p>

      <Button onClick={(e) => onSelection(speaker)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function BecomeSpeaker({ onAddSpeaker }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const [talkDescription, SetTalkDecription] = useState("");
  const [time, setTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image || !talkDescription || !time) return;

    const id = Date.now();
    const newSpeaker = {
      id,
      name,
      image: `${image}?={id}`,
      talkDescription,
      time,
    };
    onAddSpeaker(newSpeaker);

    setName("");
    setImage("https://i.pravatar.cc/48");
    SetTalkDecription("");
    setTime("");
  }

  return (
    <form className="form-add-speaker" onSubmit={handleSubmit}>
      <h3>Name:</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <h3>🖼 Image:</h3>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <h3>📝 Topic:</h3>
      <input
        type="text"
        value={talkDescription}
        onChange={(e) => SetTalkDecription(e.target.value)}
        required
      />

      <h3>⌚ Time:</h3>
      <input
        type="text"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />

      <Button>Add</Button>
    </form>
  );
}

function SpeakerInfo({ selectedSpeaker, onSelectSpeaker }) {
  function handleClick(e) {
    e.preventDefault();

    // const id = Date.now();
    const newSpeaker = {
      id: selectedSpeaker.id,
      name: selectedSpeaker.name,
      image: selectedSpeaker.image,
      talkDescription: selectedSpeaker.talkDescription,
    };
    onSelectSpeaker(newSpeaker);
  }

  return (
    <form className="form-split-bill">
      <h2>Speaker Schedules</h2>

      <div className="schedules">
        <img src={selectedSpeaker.image} alt={selectedSpeaker.name} />

        <div>
          <label>Name:</label>
          <span>{selectedSpeaker.name}</span>

          <label>Title</label>
          <span>{selectedSpeaker.talkDescription}</span>

          <label>Time:</label>
          <span>{selectedSpeaker.time}</span>

          <Button onClick={(userSpeakerList) => handleClick(userSpeakerList)}>
            Select speaker 🙂
          </Button>
        </div>
      </div>
    </form>
  );
}

function UserSpeakerList({ userSpeakerList, onDelete }) {
  return (
    <div className="user-speaker-list--container">
      <h2>Your List</h2>
      <div className="user-speaker-list">
        <ul>
          {userSpeakerList.map((speaker) => (
            <SpeakerAddedList
              speaker={speaker}
              onDelete={onDelete}
              key={speaker.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SpeakerAddedList({ speaker, onDelete }) {
  return (
    <li key={speaker.id}>
      <img src={speaker.image} alt={speaker.name} />
      <h3>{speaker.name}</h3>

      <p>{speaker.talkDescription}</p>

      <Button onClick={() => onDelete(speaker.id)}>❌</Button>
    </li>
  );
}
