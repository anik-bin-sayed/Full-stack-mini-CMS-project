import { useState } from "react";

const LessonViewer = ({ lessons }) => {
  const [current, setCurrent] = useState(lessons[0]);

  return (
    <div className="flex">
      <div className="w-1/3">
        {lessons.map((l) => (
          <div onClick={() => setCurrent(l)}>{l.title}</div>
        ))}
      </div>

      <div className="w-2/3">
        <iframe width="100%" height="400" src={current.video_url} />
      </div>
      <button>Mark Complete</button>
    </div>
  );
};

export default LessonViewer;
