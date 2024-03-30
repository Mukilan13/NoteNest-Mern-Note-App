import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import "./home.css";

const Features = () => {
  return (
    <section className="features">
      <div className="title">
        <h1>Nesting your ideas, sharing your wings.</h1>
      </div>
      <div className="feature-cards">
        <div className="card">
          <div className="tag">
            <SellOutlinedIcon className="tag-icon" />
            <div className="tag-line">Stay organized</div>
          </div>
          <p>
            Effortlessly categorize your notes, enabling lightning-fast
            retrieval and seamless organization.
          </p>
        </div>
        <div className="card">
          <div className="tag">
            <HistoryOutlinedIcon className="tag-icon" />
            <div className="tag-line">Go back in time</div>
          </div>
          <p>
            Notes are backed up with every change, so you can see what you noted
            last week or last month.
          </p>
        </div>
        <div className="card">
          <div className="tag">
            <StickyNote2OutlinedIcon className="tag-icon" />
            <div className="tag-line">Markdown support</div>
          </div>
          <p>
            Craft, preview, publish notes in Markdown for enhanced readability &
            versatility.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
