const Review = ({ shop, reviews }) => {
  return (
    <ul className="reviews">
      {reviews.hasOwnProperty(shop.id) &&
        reviews[`${shop.id}`].length > 0 &&
        reviews[`${shop.id}`].map((review) => {
          return (
            <li key={review.id}>
              <div>
                <span className="user">{review.user.name}</span>“
                {review.text.substring(0, 70) + "..."}”
              </div>
            </li>
          );
        })}
    </ul>
  );
};
export default Review;
