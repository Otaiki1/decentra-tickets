export default function Home() {
    return (
        <form className="p-5">
            <div className="mb-3">
                <label forHtml="exampleInputEmail1" className="forHtmlm-label">Event Name: </label>
                <input type="email" className="forHtmlm-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label forHtml="exampleInputtext1" className="forHtmlm-label">Number of Tickets</label>
                <input type="text" className="forHtmlm-control" id="exampleInputtext1" />
            </div>
            <div className="mb-3">
                <label forHtml="exampleInputtext1" className="forHtmlm-label">Tickets price</label>
                <input type="text" className="forHtmlm-control" id="exampleInputtext1" />
            </div>
            <div className="mb-3">
                <label forHtml="exampleInputtext1" className="forHtmlm-label">Maximum per customer</label>
                <input type="text" className="forHtmlm-control" id="exampleInputtext1" />
            </div>
            <div className="mb-3 forHtmlm-check">
                <input type="checkbox" className="forHtmlm-check-input" id="exampleCheck1" />
                <label className="forHtmlm-check-label" forHtml="exampleCheck1">Customer Limit</label>
            </div>
            <div className="mb-3">
                <label forHtml="exampleInputPassword1" className="forHtmlm-label">Deadline</label>
                <input type="text" className="forHtmlm-control" id="exampleInputtext1" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
</form>
    )
}