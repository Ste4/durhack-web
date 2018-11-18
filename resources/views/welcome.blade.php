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
                            <h3>Current Most Popular</h3>
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
                <h3>Live Updates</h3>
                    <div>
                        
                    </div>
            </div>
            <div class="col-6">
                
            </div>
        </div>
    </div>

    <script type="text/javascript">
        $(function (){
            $('.custom-select').on('change', function(){
                let canvasId = '#'+$(this).val();

                var ctx = document.getElementById('chartCanvas').getContext('2d');
                var chart = new Chart(ctx, {
                    // The type of chart we want to create
                    type: 'line',

                    // The data for our dataset
                    data: {
                        labels: ['Now', '-1H', '-2H', '-3H', '-4H', '-5H'],
                        datasets: [{
                            label: "My First dataset",
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: [0, 10, 5, 2, 20, 45],
                        }]
                    },

                    // Configuration options go here
                    options: {
                        legend: {
                            display: false
                        }
                    }
                });
            });
        });
    </script>

@endsection