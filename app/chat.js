

$( function() {
  var liveoak = new LiveOak( { host: document.location.hostname, port: document.location.port } );

  function add_message(data) {
    $( '#messages' ).append( 
      $( '<div class="message" id="' + get_id( data ) + '">' ).append( 
        $('<div class="name">').append( data.name ) ).append( 
        $('<div class="text">').append( data.text ) ) );
    $( '#messages' ).scrollTop( $('#messages')[0].scrollHeight );
  }

  function remove_message(data) {
    $( '#' + get_id( data ) ).remove();
  }

  function update_message(data) {
    var msg = $( '#' + get_id( data ) );
    msg.find( '.name' ).html( data.name );
    msg.find( '.text' ).html( data.text );
  }

  function get_id(data) {
// Strip out everything before ':'
    return data.id.substring(data.id.indexOf(':') + 1);
  }

  liveoak.connect( function() {
    liveoak.create( '/chat-html/storage', { id: 'chat' }, {
      success: function(data) {
        liveoak.subscribe( '/chat-html/storage/chat/*', function(data, action) {
          if (action == 'create') {
            add_message( data );
          } else if (action == 'update') {
            update_message( data );
          } else if (action == 'delete') {
            remove_message( data );
          }
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
