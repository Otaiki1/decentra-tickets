export default function AccordionItem({event, eventNum}){

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Event {eventNum}
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>{event}</strong>
                <div className='row'>
                  <div className='col-md-6'>
                    <button className='btn btn-success'>Click to get more info</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}