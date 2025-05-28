import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Secondary as Layout } from "../../layouts";
import { gaEvent } from "../../lib/ga";
import ButtonA from "../../components/ButtonA";

const title = "🎉 Success! 🎉";
const text = "Thank you for reserving your spot! 💃🕺";
const description = "✨ Enjoy your class with Latin Shine team ✨";

const calculateDate = (date) => {
  const n = date.getTime();
  const weekday = date.getDay();
  const dateConverted = date.getDate();
  const weekOfMonth = Math.ceil((dateConverted - 1 - weekday) / 7);
  const numDaysToNextTuesday = weekday >= 2 ? 7 - (weekday - 2) : 2 - weekday;
  const nextTuesday_msecs = n + numDaysToNextTuesday * 24 * 60 * 60 * 1000;
  const theDate = new Date(nextTuesday_msecs); // this is the date
  return { today: n, weekOfMonth, weekday, nextDate: theDate };
};

const selectedDate = 2; // tuesday;

const ReserveConfirmation = () => {
  const [nextDate, setNextDate] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    if (
      typeof searchParams.get("beginner") === undefined ||
      searchParams.get("beginner") === null
    ) {
      return;
    }
    const beginner = searchParams.get("beginner");
    const d = new Date();
    const { weekday, weekOfMonth, nextDate } = calculateDate(d);
    if (!beginner || beginner === "false") {
      if (weekday === selectedDate) {
        setNextDate(d.toLocaleDateString("en-GB"));
        return;
      }
      setNextDate(nextDate.toLocaleDateString("en-GB"));
      return; // done
    }
    if (beginner) {
      // not too late
      if (weekOfMonth <= 1) {
        if (weekday === selectedDate) {
          setNextDate(d.toLocaleDateString("en-GB"));
          return;
        }
        setNextDate(nextDate.toLocaleDateString("en-GB"));
        return;
      }
      // too late, next month
      const nextMonth = d.getMonth() + 1;
      const firstDay = new Date(d.getFullYear(), nextMonth, 1);
      const future = calculateDate(firstDay);
      setNextDate(future.nextDate.toLocaleDateString("en-GB"));
      return; // done
    }
    gaEvent({
      action: "reserve_success",
      params: { section: "reserve_confirmation" },
    });
  }, [searchParams.get("beginner")]);

  return (
    <Layout
      title="Latin Shine | Dance Company - Reserve Confirmation Screen"
      description="Latin Shine Reserve Confirmation Screen for dance classes"
    >
      <main className="text-center bg-almostBlack text-white w-full px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start">
        <h1
          className="text-bodyM font-black uppercase font-bigShoulder"
          style={{ lineHeight: "1.5rem" }}
        >
          {title}
        </h1>
        <div>
          <p>
            You are all set for your Tuesday Salsa Class on:{" "}
            <b>
              <u>{nextDate}</u>
            </b>
            .
          </p>
          <br />
          {searchParams.get("beginner") === "true" && (
            <p>
              If you have registered in the middle of the month, please join us
              next month to start your beginners course from day one, so you
              don&apos;t miss out on anything. If you would rather start
              earlier, please contact our team
            </p>
          )}
          <br />
          <p>Contact details:</p>
          <Link
            id="email_us_text"
            className="hover:underline hover:text-shine"
            href="mailto:latin_shine@outlook.com?subject = Website&body = Hi Latin Shine,"
          >
            latin_shine@outlook.com
          </Link>
          <br />
          <br />
          <p>{text}</p>
          <p>{description}</p>
        </div>
        <br />
        <div className="h-56 grid grid-cols-3 gap-4 content-between">
          <div></div>
          <div>
            <ButtonA path="/location#salsa-location" title="Salsa Location" />
          </div>
          <div></div>
        </div>
        <div></div>
      </main>
    </Layout>
  );
};

export default ReserveConfirmation;
