

export default function EventDetails({eventObject}){

    return(
        <div className="card p-5">
            <h3 className="card-title mb-5" >
                {eventObject.eventName}
            </h3>
            <div className="card-text">
                <p className="mb-5">Available Tickets: </p>
                <p className="mb-5">Event Deadline: </p>
                <p className="mb-5">Maximum ticket allowed per customer: </p>
                <p className="mb-5">Sale Active:</p>
                <p className="mb-5">Ticket Price:</p>
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="Ticket Number" className="form-label">Enter Amount of ticket you want to buy </label>
                    </div>
                    <div className="col-md-4">
                        <input type="number" className="form-control" placeholder="How many tickets do you want to buy" />
                    </div>
                    
                    <div className="col-md-4">
                        <button className="btn btn-danger btn-lg w-100">Purchase Tickets</button>
                    </div>
                </div>
            </div>
        </div>
    )
}