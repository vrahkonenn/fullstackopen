import Notification from "./Notification"
import { Link } from "react-router-dom"

const BlogList = ({ blogs, notification, errorNotification }) => {
    const sortedBlogs = () => {
      return(
        <div>

          {[...blogs].sort((a,b) => b.likes - a.likes).map(blog =>
            <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
          )}
        </div>
      )
    }

    return(


        <div>
        <h1>Blogs</h1>
        <Notification notification={notification} errorNotification={errorNotification}/>
        <ul>
            {sortedBlogs()}
        </ul>
      </div>
    )
}

export default BlogList