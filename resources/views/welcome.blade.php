@extends('layouts.app')

@section('content')

    <div class="container-fluid">
        <div class="row">
            <div class="col">
                
                <div class="card-box">
                    <h3>Current Most Popular</h3>
                    <div>
                        {!! $chartjs->render() !!}
                    </div>
                </div>

            </div>
            
            <div class="col">
                <div class="row">
                    <div class="col">
                        <h2>Venue Overview</h2>
                        <div>
                            <table class="table table-striped">
                                <thead>
                                    
                                    <tr>
                                        <th>Venue Name</th>
                                        <th>Footfall</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach(App\Venue::all() as $venue)
                                        <tr>
                                            <td>{{$venue->name}}</td>
                                            <td>{{$venue->count}}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="card-box">
                            <h3>Live Updates</h3>
                            <div>
                                {!! $lastHour->render() !!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
               
            </div>
            <div class="col-6">
                
            </div>
        </div>
    </div>

@endsection