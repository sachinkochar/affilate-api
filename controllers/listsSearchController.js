import listsModel from '../models/bookmarkListModel';
import channelModel from '../models/channelModel';
import {
   searchBookmark
} from './searchSortTopController';

module.exports = {

   listSearch(req, res, next) {

      var page = req.query.page;
      var search_text = req.query.q.replace(/\s+/g, " ").trim();
      var list_id = req.query.list_id;

      if (search_text && page && list_id) {

         searchInLists(search_text, page, list_id, function(err, data) {
            if (err) {
               res.status(500).json({
                  status: false,
                  error: err
               });
            } else if (data) {
               res.status(200).json({
                  status: true,
                  message: "Serach Result",
                  search_word: search_text,
                  total_results: data.length,
                  results: data
               });
            } else {
               res.status(404).json({
                  status: false,
                  message: "Sorry, There are no matching results."
               });
            }
         });
      } else {
         res.status(400).json({
            status: false,
            message: "You are not sending valid query params.",
            valid_params: "page, q, list_id"
         });
      }
   }

}

function searchInLists(search_text, page, list_id, cb) {
   var page_req = page;
   var total_count;

   listsModel.count({})
      .populate({
         path: "list_bookmarks.article_id",
         model: "article",
         match: {
            "main_title": {
               $regex: `${search_text}`,
               $options: 'i'
            }
         }
      })
      .where("_id").equals(list_id)
      .then((number) => {
         if (number) {
            total_count = number;
            var perPage = 10;
            var max_page = Math.ceil(total_count / perPage);

            if (page_req > max_page || page_req < 1) {
               cb({
                  message: "Send valid Page number",
                  max_page
               });
            } else {
               var page = Math.max(1, page_req);
               var temppage = page - 1;
               listsModel.find({})
                  .populate({
                     path: "list_bookmarks.article_id",
                     model: "article",
                     match: {
                        "main_title": {
                           $regex: `${search_text}`,
                           $options: 'i'
                        }
                     }
                  })
                  .where("_id").equals(list_id)
                  .limit(perPage)
                  .skip(perPage * temppage)
                  .then(docs => {

                     docs.map((data, index) => {

                        var data1 = data.list_bookmarks.filter(data => {
                           if (data.article_id !== null) {
                              return data
                           }
                        });

                        if (data1.length > 0 && index + 1 === docs.length) {
                           cb(null, data1)
                        } else {
                           cb(null);
                        }
                     });
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
}