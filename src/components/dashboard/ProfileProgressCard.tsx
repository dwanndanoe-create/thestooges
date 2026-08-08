"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
} from "lucide-react";


export function ProfileProgressCard() {


  const profileCompletion = 100;


  const missingItems = [
    "Add portfolio",
    "Add work experience",
  ];



  const stats = [
    {
      label: "Profile Views",
      value: "86",
    },
    {
      label: "Job Matches",
      value: "24",
    },
    {
      label: "Response",
      value: "92%",
    },
  ];




  return (


    <div
      className="
      bg-bg-raised
      border border-line
      rounded-2xl
      p-6
      "
    >


      {
        profileCompletion < 100 ? (


          <>

            {/* Header */}

            <div>

              <h3
                className="
                font-display
                text-xl
                text-ink
                "
              >
                Complete your profile
              </h3>


              <p
                className="
                text-sm
                text-ink-muted
                mt-1
                "
              >
                Improve your chances of getting matched.
              </p>


            </div>




            {/* Progress */}

            <div
              className="
              mt-5
              "
            >

              <div
                className="
                flex
                justify-between
                items-center
                mb-2
                "
              >

                <span
                  className="
                  text-xs
                  text-ink-faint
                  "
                >
                  Profile completion
                </span>


                <span
                  className="
                  text-sm
                  font-medium
                  text-ink
                  "
                >
                  {profileCompletion}%
                </span>


              </div>



              <div
                className="
                h-2
                rounded-full
                bg-bg-sunken
                overflow-hidden
                "
              >

                <div
                  className="
                  h-full
                  rounded-full
                  bg-emerald-700
                  "
                  style={{
                    width: `${profileCompletion}%`,
                  }}
                />

              </div>


            </div>





            {/* Missing Items */}

            <div
              className="
              mt-6
              space-y-3
              "
            >

              {
                missingItems.map((item)=>(

                  <div
                    key={item}
                    className="
                    flex
                    items-center
                    justify-between
                    text-sm
                    "
                  >

                    <span
                      className="
                      text-ink-muted
                      "
                    >
                      {item}
                    </span>


                    <ArrowRight
                      size={15}
                      className="text-ink-faint"
                    />


                  </div>


                ))
              }


            </div>





            {/* CTA */}

            <Link
              href="/profile"
              className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              h-10
              rounded-xl
              bg-emerald-800
              text-white
              text-sm
              font-medium
              hover:bg-emerald-900
              transition
              "
            >

              Finish profile

              <ArrowRight size={15}/>

            </Link>


          </>


        ) : (


          <>


            {/* Stats Header */}

            <div
              className="
              flex
              items-start
              justify-between
              "
            >

              <div>

                <h3
                  className="
                  font-display
                  text-xl
                  text-ink
                  "
                >
                  Your Marketplace Stats
                </h3>


                <p
                  className="
                  text-sm
                  text-ink-muted
                  mt-1
                  "
                >
                  Your activity this week.
                </p>


              </div>


              <BarChart3
                size={20}
                className="text-emerald-700"
              />


            </div>





            {/* Stats */}

            <div
              className="
              grid
              grid-cols-3
              gap-4
              mt-6
              "
            >

              {
                stats.map((stat)=>(

                  <div
                    key={stat.label}
                  >

                    <p
                      className="
                      text-xl
                      font-display
                      text-ink
                      "
                    >
                      {stat.value}
                    </p>


                    <p
                      className="
                      text-xs
                      text-ink-faint
                      mt-1
                      "
                    >
                      {stat.label}
                    </p>


                  </div>

                ))
              }


            </div>




            <div
              className="
              mt-6
              pt-4
              border-t
              border-line
              flex
              items-center
              gap-2
              text-xs
              text-ink-faint
              "
            >

              <CheckCircle2 size={14}/>

              Updated weekly

            </div>


          </>


        )
      }


    </div>


  );

}