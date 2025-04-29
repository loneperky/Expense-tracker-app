import "../style/home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeInSection from "../component/Animate/animate";
const Index = () => {
  return (
    <>
      <div className="overview-over">
        <div className="">
          <FadeInSection>

            <section>
              <div className="hero1">
                <div className="">
                  <h1>OxpTracker has been reimagined on Credit Karma</h1>
                  <p>
                    Reviewing transactions, monitoring your spending and tracking
                    your net worth now have a new home
                  </p>
                  <Link to="/register">
                    {" "}
                    <button>Create an account</button>
                  </Link>
                </div>
                <div className="img">
                  <img src="/investment-side.png" alt="A happy client" />
                </div>
              </div>
            </section>
          </FadeInSection>
          <FadeInSection>
            <div className="about" id="about">
              <h1>What we do</h1>
            </div>
            <section>
              <div className="hero2">
                <div className="mini">
                  <img src="/savings-side.png" alt="" />
                  <div className="sub">
                    <h1>Keep tabs on your money in one place</h1>
                    <p>
                      Track your finace,spendings and expenses in one place get
                      insight on how much you spend on daily basics
                    </p>

                    <Link to="/register">
                      {" "}
                      <button>Learn more</button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </FadeInSection>
          <FadeInSection>
            <section>
              <div className="hero3">
                <div className="sub">
                  <h1>Track your monthly spending and more.</h1>
                  <p>
                    Review your transactions, track your spending category and
                    receive monthly insight that help you better your money habits
                  </p>
                  <Link to="/register">
                    {" "}
                    <button>Register Now</button>
                  </Link>
                </div>
                <img src="/investment-side.png" alt="" />
              </div>
            </section>
          </FadeInSection>
          <FadeInSection>
        
          <section>
            <div className="hero4" id="testimony">
              <h2>
                Why People use <span>OxpTracker</span>
              </h2>
              <div className="testimony">
                <div className="test test1">
                  <p>
                    The app works intuitively fine, it makes it super easy to
                    control your money. It helps me develop healthy spending
                    habits.
                  </p>
                  <h3>Roy</h3>
                </div>
                <div className="test test2">
                  <p>
                    I have been using the app for more than two years now and i
                    could not have been more with the service I got.
                  </p>
                  <h3>Destiny</h3>
                </div>
                <div className="test test3">
                  <p>
                    I've tried other money tracking apps before Spendee, but I
                    choose to stick to this because of its simplicity and
                    intuitive design
                  </p>
                  <h3>Joy</h3>
                </div>
              </div>
            </div>
          </section>
          </FadeInSection>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2025, OxpTracker inc.</p>
      </div>
    </>
  );
};

export default Index;
