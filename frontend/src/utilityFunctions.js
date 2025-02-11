const convertDate = (date) => {
    const dateData = new Date(date);
    const monthArr = ["Jan","Feb", "Mar", "Apr",  "May", "Jun","Jul","Aug", "Sep","Oct","Nov","Dec",  ];
    return (
      dateData.getDate() +
      " " +
      monthArr[dateData.getMonth()] +
      " " +
      dateData.getFullYear()
    );
  };


  export {convertDate}