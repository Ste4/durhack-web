@extends('layouts.app')

@section('content')

    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <h2>Select a Venue</h2>
                <div>
                    <form action="/venue">
                        <select name="venue" class="custom-select" required>
                            @foreach(App\Venue::all() as $venue)
                                <option value={{$venue->id}}>{{$venue->name}}</option>
                            @endforeach
                        </select>
                        <button type="submit" class="btn btn-info">Select Venue</button>
                    </form>
                </div>
            </div>
            
            <div class="col">
                <h2>Venue Overview</h2>
                <div>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Venue Name</th>
                            <th>Number of Events</th>
                            <th>Total Visitors</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Klute</td>
                            <td>2</td>
                            <td>352</td>
                        </tr>
                        <tr>
                            <td>Jimmy Allens</td>
                            <td>4</td>
                            <td>1287</td>
                        </tr>
                        <tr>
                            <td>Bishop's Mill</td>
                            <td>1</td>
                            <td>725</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
        </div>
    </div>

@endsection