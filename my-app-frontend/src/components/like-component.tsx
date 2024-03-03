// import { fetchLikes } from "../network";

export default function LikeComponent() {

  // const fetchLikes = async () => {
  //   const response = await fetch("/api/Likes");
  //   const data = await response.json();
  //   return data;
  // }

  // const postLikes = async () => {
  //   const response = await fetch("/api/Likes");
  //   const data = await response.json();
  //   return data;
  // }
  
    function handleLike(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    const button = event.currentTarget as HTMLButtonElement;
    console.log(button);

    if (button) {
      if (button.style.color === "gray") {
        button.style.color = "red";
      } else if (button.style.color === "red") {
        button.style.color = "gray";
      }
    }
  }

  return (
    <div>
      <button onClick={handleLike} style={{ color: "gray" }}>
        Like
      </button>
    </div>
  );
}



// import React from "react";

// export default function LikeComponent() {
//   function handleLike(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
//     event.preventDefault();
//     const button = event.currentTarget as HTMLButtonElement;
//     console.log(button);

//     if (button) {
//       if (button.style.color === "gray") {
//         button.style.color = "red";
//       } else if (button.style.color === "red") {
//         button.style.color = "gray";
//       }
//     }
//   }

//   async function liked(
//     e: React.MouseEvent<SVGSVGElement, MouseEvent>,
//     id: number
//   ) {
//     e.preventDefault();

//     const likedTrello = likes.find((like: any) => like.trelloId === id);

//     if (likedTrello) {
//       console.log("hello");
//       await updateLike(likedTrello.id, likedMovie.trelloId, likedMovie.liked);
//     } else {
//       console.log("hey");
//       await createLike(id);
//     }
//   }

//   return (
//     <div>
//       <button onClick={handleLike} style={{ color: "gray" }}>
//         Like
//       </button>
//     </div>
//   );
// }
