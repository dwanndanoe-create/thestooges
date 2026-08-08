"use client";

import { useState } from "react";
import { Bell, MessageCircle } from "lucide-react";


export function DashboardTopActions(){

  const [open,setOpen] = useState<
    "messages" | "notifications" | null
  >(null);


  return (
    <div className="relative flex items-center gap-3">


      {/* Messages */}

      <button
        onClick={() =>
          setOpen(open === "messages" ? null : "messages")
        }
        className="
        relative
        h-11
        w-11
        rounded-xl
        border
        border-line
        bg-white
        hover:border-emerald-600
        transition
        grid
        place-items-center
        "
      >

        <MessageCircle
          size={19}
          className="text-emerald-700"
        />


        <span
          className="
          absolute
          -top-1
          -right-1
          h-5
          w-5
          rounded-full
          bg-emerald-700
          text-white
          text-[10px]
          grid
          place-items-center
          "
        >
          0
        </span>


      </button>




      {/* Notifications */}

      <button
        onClick={() =>
          setOpen(open === "notifications" ? null : "notifications")
        }
        className="
        h-11
        w-11
        rounded-xl
        border
        border-line
        bg-white
        hover:border-emerald-600
        transition
        grid
        place-items-center
        "
      >

        <Bell
          size={19}
          className="text-emerald-700"
        />

      </button>




      {/* Dropdown */}

      {
        open && (

          <div
            className="
            absolute
            right-0
            top-14
            w-72
            rounded-2xl
            border
            border-line
            bg-white
            shadow-lg
            p-5
            z-20
            "
          >

            {
              open === "messages" ? (

                <>
                  <h3
                    className="
                    font-display
                    text-lg
                    text-ink
                    "
                  >
                    Messages
                  </h3>


                  <p
                    className="
                    text-sm
                    text-ink-muted
                    mt-3
                    "
                  >
                    No messages yet.
                  </p>
                </>


              ) : (

                <>
                  <h3
                    className="
                    font-display
                    text-lg
                    text-ink
                    "
                  >
                    Notifications
                  </h3>


                  <p
                    className="
                    text-sm
                    text-ink-muted
                    mt-3
                    "
                  >
                    No notifications yet.
                  </p>
                </>

              )
            }


          </div>

        )
      }


    </div>
  );
}