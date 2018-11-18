@extends('layouts.app')

@section('content')
	<div class="container-fluid" id="updateVenueContainer">
	    <div class="card-deck">
	        <div class="card">
	            <div class="card-header"><h2>Edit Club Details</h2></div>
	            <div class="card-body">
	                <form>
	                    <div class="form-group">
	                        <label for="clubName">Name</label>
	                        <input class="form-control" id="clubName" type="text" placeholder="Name" readonly>
	                    </div>
	                    <div class="form-group">
	                        <label for="capacity">Capacity</label>
	                        <input class="form-control" id="capacity" type="text" placeholder="Enter Capacity", maxlength="4">
	                    </div>
	                    <div class="form-group">
	                        <label for="price">Ticket Price</label>
	                        <input class="form-control" id="price" type="text" placeholder="Enter Ticket Price", maxlength="4">
	                    </div>
	                    <div class="form-group">
	                        <label for="openTime">Opening Time</label>
	                        <select name="openTime" class="custom-select" id="openTime"></select>
	                    </div>
	                    <div class="form-group">
	                        <label for="closeTime">Closing Time</label>
	                        <select name="closeTime" class="custom-select" id="closeTime"></select>
	                    </div>
	                    <div class="form-group">
	                        <label for="clubImg">Upload Logo</label>
	                        <input type="file" class="form-control-file" id="clubImg">
	                    </div>
	                </form>
	            </div>
	            <button type="submit" class="btn btn-info" id="submitChanges">Make Changes</button>
	        </div>

	        <div class="card">
	            <div class="card-header"><h2>Your Events</h2></div>
	            <div class="card-body" id="cal">

	            	
	            	{{--
	            	@foreach(App\Evening::where('venue_id', '=', 1)->take(3)->get() as $event)
	            		<div class="row row-striped">
		        			<div class="col-2 text-right">
		        				<h1 class="display-4"><span class="badge badge-secondary">{{explode('/',$event->date)[0]}}</span></h1>
		        				<h2 id="eventMonth">
		        					<script type="text/javascript">
		        						let monthLookup = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		        						$('#eventMonth').html(monthLookup[{{explode('/',$event->date)[1]}}-1]);
		        					</script>
		        				</h2>
		        			</div>
		        			<div class="col-10">
		        				<h3 class="text-uppercase"><strong>Ice Cream Social</strong></h3>
		        				<ul class="list-inline">
		        				    <li class="list-inline-item"><i class="fa fa-calendar-o" aria-hidden="true"></i> Monday</li>
		        					<li class="list-inline-item"><i class="fa fa-clock-o" aria-hidden="true"></i> 12:30 PM - 2:00 PM</li>
		        					<li class="list-inline-item"><i class="fa fa-location-arrow" aria-hidden="true"></i> Cafe</li>
		        				</ul>
		        				<p>Lorem ipsum dolsit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		        			</div>
		        		</div>
	            	@endforeach
	            	--}}

	            </div>
	            <a href="newEvent.html" class="btn btn-info" role="button">Create New Event</a>
	        </div>
	    </div>
	</div>

	<script type="text/javascript">
		$(function() {
			//let events = JSON.parse('{!! json_encode($events) !!}');
			let events = JSON.parse('{!! json_encode($events) !!}');
			console.log(events);
			for (var event in events){
				$("#cal").append(createCalendarEntry(events[event]));
			}
		});
	</script>
@endsection