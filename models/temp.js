[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        product: ObjectId("642d63ba67b943b7ed28de6a"),
      },
  },
  {
    $group:
      /**
       * _id: The id of the group.
       * fieldN: The first field name.
       */
      {
        _id: ObjectId("642d63ba67b943b7ed28de6a"),
        averageRating: {
          $avg: "$rating",
        },
        numberOfReviews: {
          $sum: 1,
        },
      },
  },
];
