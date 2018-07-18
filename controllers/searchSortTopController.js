import publisherModel from '../models/publisherModel';

module.exports = {

   searchPublisher(search, page, cb) {
         var text = search.split("-");
         console.log("test", text)
      let result = [];
      var search_result = text.map((text, i) => {
      //    const search_text = text.replace(/\s+/g, " ").trim();
            // console.log('search', search_text);

            var page_req = page;
            var total_count;

            publisherModel.count({
                  "publisher_title": {
                     $elemMatch: `${text}`
                  }
               })
               .then((number) => {
                     console.log("numver", number);
                  if (number) {
                     total_count = number;
                     var perPage = 6;
                     var max_page = Math.ceil(total_count / perPage);

                     if (page_req > max_page || page_req < 1) {
                        cb({
                           message: "Send valid Page number",
                           max_page
                        });
                     } else {
                        var page = Math.max(1, page_req);
                        var temppage = page - 1;
                        publisherModel.find({
                              "publisher_title": {
                                 $elemMatch: `${text}`
                              }
                           })
                           .limit(perPage)
                           .skip(perPage * temppage)
                           .then(docs => {
                              //     docs;
                              // docs.map((data) => {
                              //       result.push(data);
                              // })
                              // console.log("data", result)
                              // return result;
                                 if (docs.length) {
                                 cb(null, docs)
                              } else {
                                 cb(null);
                              }
                           })
                           .catch(err => {
                              cb(err);
                           });
                     }
                  } else {
                     cb(null);
                  }
               })
               .catch(err => {
                  cb(err);
               });
            //    console.log("docs", result)
            //    return result;
      })
      // console.log("data+++++", search_result)
      // if(search_result.length){
      //       cb(null, search_result);
      // }else{
      //       cb(null);
      // }
   }
}