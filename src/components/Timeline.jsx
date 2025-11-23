import './Timeline.css';

function Timeline({ events }) {
  const startYear = 2018;
  const endYear = 2025;
  const totalYears = endYear - startYear + 1;

  const getPosition = (year, month) => {
    const yearProgress = (year - startYear) / totalYears;
    let monthProgress = 0.5; // default to mid-year
    
    if (month.includes('Vår') || month.includes('vår')) monthProgress = 0.25;
    else if (month.includes('Mai')) monthProgress = 0.4;
    else if (month.includes('September') || month.includes('september')) monthProgress = 0.7;
    else if (month.includes('Januar')) monthProgress = 0.05;
    else if (month.includes('juni')) monthProgress = 0.5;
    else if (month.includes('April')) monthProgress = 0.3;
    else if (month.includes('januar')) monthProgress = 0;
    
    return (yearProgress + monthProgress / totalYears) * 100;
  };

  return (
    <div className="timeline-container">
      <div className="timeline-line">
        {events.map((event, index) => {
          const position = getPosition(event.year, event.month);
          return (
            <div
              key={index}
              className={`timeline-marker ${event.impact}`}
              style={{ left: `${position}%` }}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-date">{event.month} {event.year}</div>
                <div className="timeline-title">{event.title}</div>
                <div className="timeline-description">{event.description}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="timeline-years">
        {Array.from({ length: totalYears }, (_, i) => startYear + i).map((year) => (
          <div key={year} className="timeline-year">
            {year}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;

