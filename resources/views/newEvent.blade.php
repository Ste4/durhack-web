@extends('layouts.app')

@section('content')
	<div class="container" id='newEventContainer'>
	    <div class="card-deck">
	        <div class="card">
	            <div class="card-header"><h2>Create New Event</h2></div>
	            <div class="card-body">
	                <form>
	                    <div class="form-group">
	                        <label for="eventName">Event Name</label>
	                        <input class="form-control" id="eventName" type="text" placeholder="Name" required>
	                    </div>
	                    <div class="form-group">
	                        <label for="date">Date</label>
	                        <div class='form-row' id='date'>
	                            <div class='col'>
	                                <select name="day" class="custom-select" id="day"></select>
	                            </div>
	                            <div class='col'>
	                                <select name="month" class="custom-select" id="month"></select>
	                            </div>
	                            <div class='col'>
	                                <select name="year" class="custom-select" id="year"></select>
	                            </div>
	                        </div>
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
	                        <label for="price">Ticket Price</label>
	                        <input class="form-control" id="price" type="text" placeholder="Enter Ticket Price" maxlength="4" required>
	                    </div>
	                    <div class="form-group">
	                        <label for="chargeTime">Start Charging Time</label>
	                        <select name="chargeTime" class="custom-select" id="chargeTime"></select>
	                    </div>
	                    <div class="form-group">
	                        <label for="description">Description</label>
	                        <textarea class="form-control" id="description" placeholder="Description" rows="3" required></textarea>
	                    </div>
	                </form>
	            </div>
	            <button type="submit" class="btn btn-info" id="submitChanges">Create Event</button>
	        </div>
	    </div>
	</div
@endsection