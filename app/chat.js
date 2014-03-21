

$( function() {
  var liveoak = new LiveOak( { host: "localhost", port: 8080 } );

  function add_message(data) {
    $( '#messages' ).append( 
      $( '<div class="message">' ).append( 
        $('<div class="name">').append( data.name ) ).append( 
        $('<div class="text">').append( data.text ) ) );
    $( '#messages' ).scrollTop( $('#messages')[0].scrollHeight );
  }

  liveoak.connect( function() {
    liveoak.create( '/chat-html/storage', { id: 'chat' }, {
      success: function(data) {
        liveoak.subscribe( '/chat-html/storage/chat/*', function(data) {
          add_message( data );
        } );
        liveoak.read( '/chat-html/storage/chat?expand=members', {
          success: function(data) {
            $(data._members).each( function(i, e) {
              add_message( e );
            } );
          }
        } );
      },
      error: function(data) {
        console.log( "chat collection NOT created" );
      }
    } );
  } );
  
  $('#input form').submit( function() {
    var name = $( '#name-field' ).val();
    var text = $( '#text-field' ).val();

    $('#text-field').val( '' );

    liveoak.create( '/chat-html/storage/chat',
                    { name: name, text: text },
                    { success: function(data) { 
                        console.log( "sent" ); 
                      },
                      error: function() {
                        console.log( "error occurred" );
                      }
                  } );
    return false;
  } );

} )
