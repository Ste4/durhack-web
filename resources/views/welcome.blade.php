@extends('layouts.app')

@section('content')

    <nav class="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#">Select A Venue</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Venue Information</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Event </a>
            </li>
        </ul>
    </nav>
    <p></p>

    <div class="container-fluid">
                <form class="form-inline">
                    <select name="venue" class="custom-select" required>
                        <option value="Klute">Klute</option>
                        <option value="Jimmy Allens">Jimmy Allens</option>
                        <option value="Bishop's Mill">Bishop's Mill</option>
                    </select>
                    <p>  </p>
                    <button type="submit" class="btn btn-info" formaction="venue.html">Select Venue</button>
                </form>
            </div>
        </div>
    </nav>
    <p></p>

    <div class="container-fluid">
        <div class="card-deck">



            <div class="card">
                <div class="card-header"><h2>Select a Venue</h2></div>
                <div class="card-body">
                    <form action="/venue">
                        <select name="venue" class="custom-select" required>

                            @foreach(App\Venue::all() as $venue)
                                <option value={{$venue->id}}>{{$venue->name}}</option>
                            @endforeach

                        </select>
                        <p></p>
                        <button type="submit" class="btn btn-info">Select Venue</button>
                    </form>
                </div>
            </div>
            <p></p>
            <div class="card">
                <div class="card-header"><h2>Venue Overview</h2></div>
                <div class="card-body">
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
    </div>

@endsection