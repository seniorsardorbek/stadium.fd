"use client";
import { getData } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { CommentFace } from "@/utils/types";
import { prettyDateFormat } from "@/utils/utils";
import { Send } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NoToken from "./noToken";

function Comments({
  stadiumId,
  toggleComments,
  openComments,
}: {
  stadiumId: string;
  toggleComments: any;
  openComments: boolean;
}) {
  const [comments, setComments] = useState<CommentFace[]>([]);
  const [data, setData] = useState<{ comment: string }>({ comment: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useSelector((state: any) => state.data);

  const router = useRouter();
  useEffect(() => {
    getComments();
  }, [stadiumId, openComments]);
  function getComments() {
    setLoading(true);
    getData(`comments/${stadiumId}`)
      .then((res) => {
        setComments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.warning(err.response.data.message, {
          style: { width: '250px' },
        });
        if (err.response.status === 401) {
          router.push('/login');
        }
      });
  }



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getData
      .post(`comments/${stadiumId}`, data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then(() => {
        setData({ comment: '' });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.warning('Iltimos oldin hisobga kiring!');
          router.replace('/login');
        }
      })
      .finally(() => {
        getComments();
      });
  };
  return (
    <section>
      <div
        onClick={(e) => toggleComments(e)}
        id="commentsWrapper"
        className={`fixed w-full h-[100vh]  transition-all duration-200  bg-black  bg-opacity-90   top-0 left-0 ${
          openComments ? "" : "hidden"
        } `}
      ></div>
      <div
        className={`z-[1000]  scrollbar-hidden   overflow-visible transition-all duration-200 bottom-0 pb-16 rounded-t-3xl mx-auto max-h-[75vh] dark:bg-gray-700 pt-6 bg-blue-50  fixed  w-full h-0  ${
          openComments
            ? "h-fit min-h-[20vh]  translate-y-0 overflow-y-scroll"
            : "translate-y-full"
        } `}
      >
        {loading ? (
          <div className=" w-4 mx-auto  h-4 rounded-full animate-spin border-2 border-dashed dark:border-white border-gray-950 border-t-transparent"></div>
        ) : (
          <div className=" flex flex-col inset-0 scrollbar-hidden overflow-y-scroll ">
            {comments.map((el, i) => {
              return (
                <div key={i} className="flex  gap-2 p-3 rounded-2xl my-1 dark:text-white text-gray-900  mx-auto w-[90%]">
                  <Avatar sx={{width : '30px' , height:"30px"}} />{" "}
                    {
                      <div className="flex  flex-col w-[90%]">
                        <div className="flex text-xs  text-gray-500 gap-1">
                          <a href={`mailto:${el.commentBy.email}`}>
                            {el.commentBy.email}
                          </a>{" "}
                          ·<time>{prettyDateFormat(el.created_at)}</time>
                        </div>
                        <p>{el.comment}</p>
                      </div>
                    }
                </div>
              );
            })}
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={` fixed bottom-0 flex w-full px-6 py-4 dark-text-white z-[1200] dark:bg-gray-700 bg-blue-50  ${
          openComments ? "" : "hidden"
        } `}
      >
        <div className="relative z-0 w-full   px-4 group">
          <input value={data.comment}
            onChange={(e) => handleChange(e)}
            type="text"
            name="comment"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
            placeholder=""
            required
          />
          <label
            htmlFor="floating_email"
            className=" flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-3 -z-10 origin-[0] peer-focus:left-6 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y- peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            {token?  'Sharh qoldiring...' :"Oldin tizimga kiring" }
          </label>
        </div>
        <button
          disabled={!token}
          type="submit"
          className="dark:text-white "
        >
          <Send />
        </button>
      </form>
    </section>
  );
}

export default Comments;

{
  /* <div

>
</div> */
}
