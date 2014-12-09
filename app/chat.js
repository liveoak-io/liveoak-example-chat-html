

$( function() {
  var liveoak = new LiveOak( { host: document.location.hostname, port: document.location.port } );

  function add_message(data) {
    $( '#welcome').hide();
    $( '#messages' ).append( 
      $( '<div class="message" id="' + get_id( data ) + '">' ).append( 
        $('<span class="badge badge-primary pull-left" style="font-size: 2.5em; margin-right: 10px; background-color:' + colors[get_color(data.name)] + '">').append( data.name[0] ) ).append( 
        $('<div class="name">').append( data.name ) ).append( 
        $('<div class="text">').append( data.text ) ) );
    $( '#messages' ).scrollTop( $('#messages')[0].scrollHeight );
  }

  function remove_message(data) {
    $( '#' + get_id( data ) ).remove();
    if ($( '.message' ).length === 0) {
      $( '#welcome').show();
    }
  }

  function update_message(data) {
    var msg = $( '#' + get_id( data ) );
    msg.find( '.name' ).html( data.name );
    msg.find( '.text' ).html( data.text );
  }

  function get_id(data) {
// Parse "12345" from string like: ObjectId("12345")
    var msgId = data.id.substring(data.id.indexOf('"') + 1);
    msgId = msgId.substring(0, msgId.indexOf('"'));
    return msgId;
  }

  function hash(str) {
    var hash = 0, i, chr, len;
    if (str.length == 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  function get_color(name) {
    return (Math.abs(hash(name)) % colors.length);
  }

  var colors = ['#F44336','#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#CDDC39','#FFC107','#FF9800','#FF5722','#795548','#9E9E9E','#607D8B','#000000'];

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
        liveoak.read( '/chat-html/storage/chat?fields=*(*)', {
          success: function(data) {
            $(data.members).each( function(i, e) {
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

  $('#input').keypress(function(e) {
    if (e.which == 13) {
      $('#input form').submit();
      return false;
    }
  });  

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
