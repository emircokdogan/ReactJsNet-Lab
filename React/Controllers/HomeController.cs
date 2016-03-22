using System.Collections;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.UI;
using React.Models;

namespace React.Controllers
{
    public class HomeController : Controller
    {
        private static readonly IList<CommentModel> _comments;

        static HomeController()
        {
            _comments = new List<CommentModel>()
            {
                new CommentModel()
                {
                    Author="Emir Çokdoğan 1",
                    Text = "Test Comment 1"  
                },
                new CommentModel()
                {
                    Author="Emir Çokdoğan 2",
                    Text = "Test Comment 2"
                },
                new CommentModel()
                {
                    Author="Emir Çokdoğan 3",
                    Text = "Test Comment 3"
                },
            };
        }

        public ActionResult Index()
        {
            return View(_comments);
        }

        [OutputCache(Location = OutputCacheLocation.None)]
        public ActionResult Comments()
        {
            return Json(_comments, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddComment(CommentModel comment)
        {
            _comments.Add(comment);
            return Content("Success :)");
        }
    }
}